"""
Stripe payment service with profit splitting for Uplift Education
"""
import stripe
from typing import Dict, Any, Optional
from ..core.config import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

class StripePaymentService:
    """Handle Stripe payments with automatic profit splitting"""
    
    def __init__(self):
        self.uplift_account_id = settings.UPLIFT_STRIPE_ACCOUNT_ID
        self.uplift_share_percentage = settings.UPLIFT_PROFIT_SHARE
    
    async def create_payment_intent(
        self,
        amount: int,
        currency: str = "usd",
        customer_email: Optional[str] = None,
        metadata: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """
        Create a Stripe Payment Intent with profit splitting
        
        Args:
            amount: Amount in cents
            currency: Currency code (default: usd)
            customer_email: Customer email
            metadata: Additional metadata
        
        Returns:
            Payment Intent object
        """
        try:
            # Calculate profit split
            uplift_amount = int(amount * self.uplift_share_percentage)
            ebl_amount = amount - uplift_amount
            
            # Create payment intent
            payment_intent = stripe.PaymentIntent.create(
                amount=amount,
                currency=currency,
                automatic_payment_methods={"enabled": True},
                receipt_email=customer_email,
                metadata={
                    **(metadata or {}),
                    "uplift_share": uplift_amount,
                    "ebl_share": ebl_amount,
                    "uplift_percentage": self.uplift_share_percentage
                },
                # Transfer data for profit splitting
                transfer_data={
                    "destination": self.uplift_account_id,
                    "amount": uplift_amount
                }
            )
            
            return {
                "payment_intent_id": payment_intent.id,
                "client_secret": payment_intent.client_secret,
                "amount": amount,
                "uplift_share": uplift_amount,
                "ebl_share": ebl_amount,
                "status": payment_intent.status
            }
        
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")
    
    async def confirm_payment(self, payment_intent_id: str) -> Dict[str, Any]:
        """Confirm a payment intent"""
        try:
            payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
            return {
                "id": payment_intent.id,
                "status": payment_intent.status,
                "amount": payment_intent.amount,
                "charges": payment_intent.charges.data if payment_intent.charges else []
            }
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")
    
    async def create_checkout_session(
        self,
        line_items: list,
        success_url: str,
        cancel_url: str,
        customer_email: Optional[str] = None,
        metadata: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """
        Create a Stripe Checkout Session for Reign products
        
        Args:
            line_items: List of products with prices
            success_url: URL to redirect after successful payment
            cancel_url: URL to redirect if payment cancelled
            customer_email: Customer email
            metadata: Additional metadata
        
        Returns:
            Checkout Session object
        """
        try:
            # Calculate total and profit split
            total_amount = sum(item['price_data']['unit_amount'] * item['quantity'] for item in line_items)
            uplift_amount = int(total_amount * self.uplift_share_percentage)
            
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=line_items,
                mode='payment',
                success_url=success_url,
                cancel_url=cancel_url,
                customer_email=customer_email,
                metadata={
                    **(metadata or {}),
                    "uplift_share": uplift_amount,
                    "uplift_percentage": self.uplift_share_percentage
                },
                payment_intent_data={
                    "transfer_data": {
                        "destination": self.uplift_account_id,
                        "amount": uplift_amount
                    }
                }
            )
            
            return {
                "session_id": session.id,
                "url": session.url,
                "total_amount": total_amount,
                "uplift_share": uplift_amount
            }
        
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")
    
    async def create_refund(
        self,
        payment_intent_id: str,
        amount: Optional[int] = None,
        reason: Optional[str] = None
    ) -> Dict[str, Any]:
        """Create a refund for a payment"""
        try:
            refund = stripe.Refund.create(
                payment_intent=payment_intent_id,
                amount=amount,
                reason=reason
            )
            
            return {
                "refund_id": refund.id,
                "amount": refund.amount,
                "status": refund.status
            }
        
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")
    
    async def get_balance(self) -> Dict[str, Any]:
        """Get Stripe account balance"""
        try:
            balance = stripe.Balance.retrieve()
            return {
                "available": balance.available,
                "pending": balance.pending
            }
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")
    
    async def create_connected_account(
        self,
        email: str,
        business_name: str,
        business_type: str = "company"
    ) -> Dict[str, Any]:
        """
        Create a Stripe Connected Account (for Uplift Education or other partners)
        """
        try:
            account = stripe.Account.create(
                type="express",
                email=email,
                business_type=business_type,
                company={"name": business_name},
                capabilities={
                    "card_payments": {"requested": True},
                    "transfers": {"requested": True},
                }
            )
            
            return {
                "account_id": account.id,
                "email": email,
                "business_name": business_name
            }
        
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")
    
    async def create_account_link(self, account_id: str, refresh_url: str, return_url: str) -> str:
        """Create an account link for onboarding"""
        try:
            account_link = stripe.AccountLink.create(
                account=account_id,
                refresh_url=refresh_url,
                return_url=return_url,
                type="account_onboarding"
            )
            return account_link.url
        
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")

# Initialize service
stripe_service = StripePaymentService()

