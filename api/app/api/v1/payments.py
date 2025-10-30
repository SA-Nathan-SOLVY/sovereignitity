"""
Payments API - Stripe integration with profit splitting
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from ...services.stripe_service import stripe_service

router = APIRouter()

# Pydantic models
class LineItem(BaseModel):
    product_id: str
    product_name: str
    sku: str
    quantity: int
    unit_price: int  # in cents

class CreateCheckoutRequest(BaseModel):
    line_items: List[LineItem]
    customer_email: EmailStr
    success_url: str
    cancel_url: str
    metadata: Optional[Dict[str, Any]] = None

class CreatePaymentIntentRequest(BaseModel):
    amount: int  # in cents
    currency: str = "usd"
    customer_email: Optional[EmailStr] = None
    metadata: Optional[Dict[str, Any]] = None

class RefundRequest(BaseModel):
    payment_intent_id: str
    amount: Optional[int] = None
    reason: Optional[str] = None

@router.post("/checkout/create")
async def create_checkout_session(request: CreateCheckoutRequest):
    """
    Create a Stripe Checkout Session for Reign products
    Automatically splits 10% profit to Uplift Education
    """
    try:
        # Convert line items to Stripe format
        stripe_line_items = []
        for item in request.line_items:
            stripe_line_items.append({
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": item.product_name,
                        "metadata": {
                            "sku": item.sku,
                            "product_id": item.product_id
                        }
                    },
                    "unit_amount": item.unit_price
                },
                "quantity": item.quantity
            })
        
        # Create checkout session with profit splitting
        session = await stripe_service.create_checkout_session(
            line_items=stripe_line_items,
            success_url=request.success_url,
            cancel_url=request.cancel_url,
            customer_email=request.customer_email,
            metadata=request.metadata
        )
        
        return {
            "success": True,
            "session_id": session["session_id"],
            "checkout_url": session["url"],
            "total_amount": session["total_amount"],
            "uplift_share": session["uplift_share"],
            "ebl_share": session["total_amount"] - session["uplift_share"],
            "uplift_percentage": "10%"
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/intent/create")
async def create_payment_intent(request: CreatePaymentIntentRequest):
    """
    Create a Payment Intent for custom checkout flows
    Automatically splits 10% profit to Uplift Education
    """
    try:
        payment_intent = await stripe_service.create_payment_intent(
            amount=request.amount,
            currency=request.currency,
            customer_email=request.customer_email,
            metadata=request.metadata
        )
        
        return {
            "success": True,
            **payment_intent
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/intent/{payment_intent_id}")
async def get_payment_intent(payment_intent_id: str):
    """Get payment intent status"""
    try:
        payment_intent = await stripe_service.confirm_payment(payment_intent_id)
        return {
            "success": True,
            **payment_intent
        }
    
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/refund/create")
async def create_refund(request: RefundRequest):
    """Create a refund for a payment"""
    try:
        refund = await stripe_service.create_refund(
            payment_intent_id=request.payment_intent_id,
            amount=request.amount,
            reason=request.reason
        )
        
        return {
            "success": True,
            **refund
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/balance")
async def get_balance():
    """Get Stripe account balance"""
    try:
        balance = await stripe_service.get_balance()
        return {
            "success": True,
            **balance
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/profit-split/calculate")
async def calculate_profit_split(amount: int):
    """
    Calculate profit split for a given amount
    
    Args:
        amount: Amount in cents
    
    Returns:
        Breakdown of profit split
    """
    uplift_share = int(amount * 0.10)
    ebl_share = amount - uplift_share
    
    return {
        "total_amount": amount,
        "total_amount_formatted": f"${amount / 100:.2f}",
        "uplift_share": uplift_share,
        "uplift_share_formatted": f"${uplift_share / 100:.2f}",
        "uplift_percentage": "10%",
        "ebl_share": ebl_share,
        "ebl_share_formatted": f"${ebl_share / 100:.2f}",
        "ebl_percentage": "90%"
    }

