"""
Configuration settings for SOLVY Platform API
"""
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "SOLVY Platform"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = "postgresql://solvy_user:password@localhost:5432/solvy"
    
    # Stripe
    STRIPE_SECRET_KEY: str
    STRIPE_PUBLISHABLE_KEY: str
    STRIPE_WEBHOOK_SECRET: str
    UPLIFT_STRIPE_ACCOUNT_ID: str  # Uplift Education connected account
    UPLIFT_PROFIT_SHARE: float = 0.10  # 10% to Uplift Education
    
    # AI Services
    DEEPSEEK_API_KEY: str
    DEEPSEEK_BASE_URL: str = "https://api.deepseek.com/v1"
    KIMI_API_KEY: str = ""
    KIMI_BASE_URL: str = "https://api.moonshot.cn/v1"
    
    # Email (Mailcow)
    SMTP_HOST: str = "mail.solvy.chain"
    SMTP_PORT: int = 587
    SMTP_USER: str = "orders@solvy.chain"
    SMTP_PASSWORD: str
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://solvy.chain",
        "https://ebl.jewelpads.com"
    ]
    
    # File Storage (MinIO)
    MINIO_ENDPOINT: str = "localhost:9000"
    MINIO_ACCESS_KEY: str
    MINIO_SECRET_KEY: str
    MINIO_BUCKET: str = "solvy-files"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

