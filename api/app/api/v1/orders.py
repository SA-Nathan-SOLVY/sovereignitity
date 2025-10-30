"""
Orders API - Order management and tracking
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict
from datetime import datetime

router = APIRouter()

# Pydantic models
class ShippingAddress(BaseModel):
    name: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    postal_code: str
    country: str = "US"
    phone: Optional[str] = None

class OrderItem(BaseModel):
    product_id: str
    product_name: str
    sku: str
    quantity: int
    unit_price: int
    total_price: int

class CreateOrderRequest(BaseModel):
    customer_email: EmailStr
    customer_name: str
    items: List[OrderItem]
    shipping_address: ShippingAddress
    payment_intent_id: Optional[str] = None

class OrderResponse(BaseModel):
    id: str
    customer_email: str
    customer_name: str
    items: List[OrderItem]
    subtotal: int
    tax: int
    shipping: int
    total: int
    uplift_share: int
    ebl_share: int
    status: str
    payment_status: str
    shipping_address: ShippingAddress
    tracking_number: Optional[str]
    created_at: datetime
    paid_at: Optional[datetime]
    shipped_at: Optional[datetime]

# In-memory orders storage (replace with database in production)
ORDERS_DB: Dict[str, dict] = {}

@router.post("/create", response_model=OrderResponse)
async def create_order(request: CreateOrderRequest):
    """Create a new order"""
    try:
        # Calculate totals
        subtotal = sum(item.total_price for item in request.items)
        tax = int(subtotal * 0.0825)  # 8.25% sales tax (Texas)
        shipping = 0 if subtotal >= 5000 else 500  # Free shipping over $50
        total = subtotal + tax + shipping
        
        # Calculate profit split
        uplift_share = int(total * 0.10)
        ebl_share = total - uplift_share
        
        # Generate order ID
        order_id = f"ord_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        # Create order
        order = {
            "id": order_id,
            "customer_email": request.customer_email,
            "customer_name": request.customer_name,
            "items": [item.dict() for item in request.items],
            "subtotal": subtotal,
            "tax": tax,
            "shipping": shipping,
            "total": total,
            "uplift_share": uplift_share,
            "ebl_share": ebl_share,
            "status": "pending",
            "payment_status": "pending",
            "shipping_address": request.shipping_address.dict(),
            "tracking_number": None,
            "payment_intent_id": request.payment_intent_id,
            "created_at": datetime.now(),
            "paid_at": None,
            "shipped_at": None
        }
        
        # Store order
        ORDERS_DB[order_id] = order
        
        return order
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(order_id: str):
    """Get order by ID"""
    order = ORDERS_DB.get(order_id)
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return order

@router.get("/customer/{email}")
async def get_customer_orders(email: str):
    """Get all orders for a customer"""
    customer_orders = [
        order for order in ORDERS_DB.values()
        if order["customer_email"] == email
    ]
    
    return {
        "customer_email": email,
        "orders": customer_orders,
        "total_orders": len(customer_orders)
    }

@router.patch("/{order_id}/status")
async def update_order_status(order_id: str, status: str):
    """Update order status"""
    order = ORDERS_DB.get(order_id)
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order["status"] = status
    
    if status == "paid":
        order["paid_at"] = datetime.now()
        order["payment_status"] = "succeeded"
    elif status == "shipped":
        order["shipped_at"] = datetime.now()
    
    return {
        "success": True,
        "order_id": order_id,
        "status": status
    }

@router.patch("/{order_id}/tracking")
async def update_tracking_number(order_id: str, tracking_number: str):
    """Update order tracking number"""
    order = ORDERS_DB.get(order_id)
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order["tracking_number"] = tracking_number
    order["status"] = "shipped"
    order["shipped_at"] = datetime.now()
    
    return {
        "success": True,
        "order_id": order_id,
        "tracking_number": tracking_number
    }

@router.get("/analytics/summary")
async def get_order_analytics():
    """Get order analytics summary"""
    total_orders = len(ORDERS_DB)
    total_revenue = sum(order["total"] for order in ORDERS_DB.values())
    total_uplift_share = sum(order["uplift_share"] for order in ORDERS_DB.values())
    total_ebl_share = sum(order["ebl_share"] for order in ORDERS_DB.values())
    
    return {
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "total_revenue_formatted": f"${total_revenue / 100:.2f}",
        "uplift_education_share": total_uplift_share,
        "uplift_education_share_formatted": f"${total_uplift_share / 100:.2f}",
        "ebl_share": total_ebl_share,
        "ebl_share_formatted": f"${total_ebl_share / 100:.2f}",
        "average_order_value": total_revenue / total_orders if total_orders > 0 else 0
    }

