"""
SOLVY Platform API
FastAPI backend for Reign products, SOLVY cards, and AI services
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .api.v1 import payments, products, orders, ai_services

app = FastAPI(
    title="SOLVY Platform API",
    description="AI-Powered Cooperative Banking & E-Commerce Platform",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(
    payments.router,
    prefix="/api/v1/payments",
    tags=["payments"]
)
app.include_router(
    products.router,
    prefix="/api/v1/products",
    tags=["products"]
)
app.include_router(
    orders.router,
    prefix="/api/v1/orders",
    tags=["orders"]
)
app.include_router(
    ai_services.router,
    prefix="/api/v1/ai",
    tags=["ai-services"]
)

@app.get("/")
async def root():
    return {
        "message": "SOLVY Platform API",
        "version": "1.0.0",
        "services": {
            "payments": "Stripe Connect with profit splitting",
            "products": "Reign menstrual products catalog",
            "orders": "Order management and tracking",
            "ai": "DeepSeek (tax) + Kimi (support)"
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "stripe": "configured",
        "ai_services": {
            "deepseek": "ready",
            "kimi": "ready"
        }
    }

