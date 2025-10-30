"""
Database models for SOLVY Platform
"""
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

Base = declarative_base()

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    phone = Column(String)
    stripe_customer_id = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    orders = relationship("Order", back_populates="user")

class Product(Base):
    __tablename__ = "products"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    sku = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    price = Column(Integer, nullable=False)  # Price in cents
    category = Column(String)
    stock_quantity = Column(Integer, default=0)
    image_url = Column(String)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    order_items = relationship("OrderItem", back_populates="product")

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    
    # Stripe
    stripe_payment_intent_id = Column(String)
    stripe_charge_id = Column(String)
    
    # Amounts (in cents)
    subtotal = Column(Integer, nullable=False)
    tax = Column(Integer, default=0)
    shipping = Column(Integer, default=0)
    total = Column(Integer, nullable=False)
    
    # Profit split
    uplift_share = Column(Integer)  # Amount going to Uplift Education
    ebl_share = Column(Integer)  # Amount going to EBL
    
    # Status
    status = Column(String, default="pending")  # pending, paid, shipped, delivered, cancelled
    payment_status = Column(String, default="pending")  # pending, succeeded, failed
    
    # Shipping
    shipping_address = Column(JSON)
    tracking_number = Column(String)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    paid_at = Column(DateTime)
    shipped_at = Column(DateTime)
    delivered_at = Column(DateTime)
    
    # Relationships
    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    product_id = Column(String, ForeignKey("products.id"), nullable=False)
    
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Integer, nullable=False)  # Price in cents at time of order
    total_price = Column(Integer, nullable=False)  # quantity * unit_price
    
    # Relationships
    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    order_id = Column(String, ForeignKey("orders.id"))
    user_id = Column(String, ForeignKey("users.id"))
    
    # Transaction details
    type = Column(String, nullable=False)  # payment, refund, transfer, profit_share
    amount = Column(Integer, nullable=False)
    currency = Column(String, default="usd")
    
    # Stripe
    stripe_transaction_id = Column(String)
    
    # Status
    status = Column(String, default="pending")
    
    # Metadata
    metadata = Column(JSON)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)

class TaxDocument(Base):
    __tablename__ = "tax_documents"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    
    # Document details
    type = Column(String, nullable=False)  # W2, 1099, receipt, invoice
    year = Column(Integer, nullable=False)
    file_url = Column(String, nullable=False)
    
    # Extracted data
    amount = Column(Float)
    category = Column(String)
    
    # Processing
    processed = Column(Boolean, default=False)
    analysis = Column(JSON)  # DeepSeek analysis results
    
    # Timestamps
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    processed_at = Column(DateTime)

class SupportConversation(Base):
    __tablename__ = "support_conversations"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"))
    
    # Status
    status = Column(String, default="active")  # active, resolved, escalated
    escalated_to_human = Column(Boolean, default=False)
    
    # Rating
    satisfaction_rating = Column(Integer)  # 1-5
    feedback = Column(Text)
    
    # Timestamps
    started_at = Column(DateTime, default=datetime.utcnow)
    ended_at = Column(DateTime)

class SupportMessage(Base):
    __tablename__ = "support_messages"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    conversation_id = Column(String, ForeignKey("support_conversations.id"), nullable=False)
    
    # Message
    sender = Column(String, nullable=False)  # user, ai, human
    message = Column(Text, nullable=False)
    
    # Metadata
    metadata = Column(JSON)
    
    # Timestamp
    timestamp = Column(DateTime, default=datetime.utcnow)

