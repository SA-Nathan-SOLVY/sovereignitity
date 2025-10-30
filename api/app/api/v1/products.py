"""
Products API - Reign menstrual products catalog
"""
from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter()

# Pydantic models
class ProductResponse(BaseModel):
    id: str
    sku: str
    name: str
    description: str
    price: int  # in cents
    category: str
    stock_quantity: int
    image_url: Optional[str]
    active: bool

# Reign Products Catalog (from CSV)
REIGN_PRODUCTS = [
    {
        "id": "prod_reign_supreme",
        "sku": "CD11155216",
        "name": "Reign Supreme Bundle",
        "description": "Complete menstrual care bundle with all flow types",
        "price": 3000,  # $30.00
        "category": "bundle",
        "stock_quantity": 100,
        "image_url": "/images/reign-supreme.jpg",
        "active": True
    },
    {
        "id": "prod_customer_bundle",
        "sku": "J090155216",
        "name": "Customer Bundle",
        "description": "Curated selection of popular products",
        "price": 2400,  # $24.00
        "category": "bundle",
        "stock_quantity": 100,
        "image_url": "/images/customer-bundle.jpg",
        "active": True
    },
    {
        "id": "prod_very_light",
        "sku": "J0012-15521678",
        "name": "Very Light Panty Liners",
        "description": "Ultra-thin protection for very light days",
        "price": 600,  # $6.00
        "category": "individual",
        "stock_quantity": 200,
        "image_url": "/images/very-light.jpg",
        "active": True
    },
    {
        "id": "prod_thong",
        "sku": "J0013-15521678",
        "name": "The Thong",
        "description": "Discreet protection designed for thong underwear",
        "price": 600,  # $6.00
        "category": "individual",
        "stock_quantity": 200,
        "image_url": "/images/thong.jpg",
        "active": True
    },
    {
        "id": "prod_ultra_thin",
        "sku": "J007-15521678",
        "name": "Ultra Thin Panty Liners",
        "description": "Thin and comfortable for light flow",
        "price": 600,  # $6.00
        "category": "individual",
        "stock_quantity": 200,
        "image_url": "/images/ultra-thin.jpg",
        "active": True
    },
    {
        "id": "prod_moderate",
        "sku": "J008-15521678",
        "name": "Moderate Flow",
        "description": "Perfect for moderate flow days",
        "price": 600,  # $6.00
        "category": "individual",
        "stock_quantity": 200,
        "image_url": "/images/moderate.jpg",
        "active": True
    },
    {
        "id": "prod_heavy",
        "sku": "J009-15521678",
        "name": "Heavy Flow",
        "description": "Maximum protection for heavy flow",
        "price": 600,  # $6.00
        "category": "individual",
        "stock_quantity": 200,
        "image_url": "/images/heavy.jpg",
        "active": True
    },
    {
        "id": "prod_super_heavy",
        "sku": "J010-15521678",
        "name": "Super Heavy Overnight",
        "description": "Extra protection for overnight and super heavy flow",
        "price": 600,  # $6.00
        "category": "individual",
        "stock_quantity": 200,
        "image_url": "/images/super-heavy.jpg",
        "active": True
    },
    {
        "id": "prod_corp_10",
        "sku": "REIGN-CORP-10",
        "name": "Reign Corporate Package - 10 Pack",
        "description": "Corporate wellness package for 10 employees",
        "price": 5500,  # $55.00
        "category": "corporate",
        "stock_quantity": 50,
        "image_url": "/images/corporate-10.jpg",
        "active": True
    },
    {
        "id": "prod_corp_25",
        "sku": "REIGN-CORP-25",
        "name": "Reign Corporate Package - 25 Pack",
        "description": "Corporate wellness package for 25 employees",
        "price": 13000,  # $130.00
        "category": "corporate",
        "stock_quantity": 30,
        "image_url": "/images/corporate-25.jpg",
        "active": True
    },
    {
        "id": "prod_corp_50",
        "sku": "REIGN-CORP-50",
        "name": "Reign Corporate Package - 50 Pack",
        "description": "Corporate wellness package for 50 employees",
        "price": 25000,  # $250.00
        "category": "corporate",
        "stock_quantity": 20,
        "image_url": "/images/corporate-50.jpg",
        "active": True
    },
    {
        "id": "prod_school_100",
        "sku": "REIGN-SCHOOL-100",
        "name": "Reign School Wellness Package",
        "description": "School wellness package for 100 students - Uplift Education Partnership",
        "price": 47500,  # $475.00
        "category": "school",
        "stock_quantity": 10,
        "image_url": "/images/school-100.jpg",
        "active": True
    }
]

@router.get("/", response_model=List[ProductResponse])
async def get_all_products(
    category: Optional[str] = None,
    active_only: bool = True
):
    """Get all Reign products"""
    products = REIGN_PRODUCTS
    
    # Filter by category
    if category:
        products = [p for p in products if p["category"] == category]
    
    # Filter by active status
    if active_only:
        products = [p for p in products if p["active"]]
    
    return products

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: str):
    """Get a specific product by ID"""
    product = next((p for p in REIGN_PRODUCTS if p["id"] == product_id), None)
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return product

@router.get("/sku/{sku}", response_model=ProductResponse)
async def get_product_by_sku(sku: str):
    """Get a specific product by SKU"""
    product = next((p for p in REIGN_PRODUCTS if p["sku"] == sku), None)
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return product

@router.get("/categories/list")
async def get_categories():
    """Get all product categories"""
    categories = list(set(p["category"] for p in REIGN_PRODUCTS))
    return {
        "categories": categories,
        "count": len(categories)
    }

