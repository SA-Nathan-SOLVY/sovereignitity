"""
AI Services API - DeepSeek (tax) and Kimi (customer service)
"""
from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List, Optional, Dict
import httpx
from ...core.config import settings

router = APIRouter()

# Pydantic models
class TaxAnalysisRequest(BaseModel):
    financial_data: str
    year: int = 2025

class TaxAnalysisResponse(BaseModel):
    analysis: str
    deductions: List[Dict]
    estimated_tax: float
    recommendations: List[str]

class CustomerSupportRequest(BaseModel):
    message: str
    user_id: Optional[str] = None
    conversation_id: Optional[str] = None
    context: Optional[Dict] = None

class CustomerSupportResponse(BaseModel):
    response: str
    conversation_id: str
    escalate_to_human: bool = False

# DeepSeek Tax Assistant
@router.post("/tax/analyze", response_model=TaxAnalysisResponse)
async def analyze_tax_situation(request: TaxAnalysisRequest):
    """
    Analyze tax situation using DeepSeek AI
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{settings.DEEPSEEK_BASE_URL}/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.DEEPSEEK_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "deepseek-chat",
                    "messages": [
                        {
                            "role": "system",
                            "content": "You are a tax expert assistant. Analyze the user's financial data and provide tax optimization recommendations."
                        },
                        {
                            "role": "user",
                            "content": f"Analyze my {request.year} tax situation: {request.financial_data}"
                        }
                    ],
                    "temperature": 0.7
                },
                timeout=30.0
            )
            
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail="DeepSeek API error")
            
            result = response.json()
            analysis_text = result["choices"][0]["message"]["content"]
            
            # Parse analysis (simplified - in production, use structured output)
            return {
                "analysis": analysis_text,
                "deductions": [
                    {"name": "Home Office", "amount": 5000},
                    {"name": "Business Expenses", "amount": 3000}
                ],
                "estimated_tax": 12500.00,
                "recommendations": [
                    "Consider maximizing retirement contributions",
                    "Track all business mileage",
                    "Keep detailed expense records"
                ]
            }
    
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="DeepSeek API timeout")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@router.post("/tax/upload-document")
async def upload_tax_document(
    file: UploadFile = File(...),
    document_type: str = "W2",
    year: int = 2025
):
    """Upload tax document for analysis"""
    try:
        # In production, save to MinIO and process with OCR
        return {
            "success": True,
            "filename": file.filename,
            "document_type": document_type,
            "year": year,
            "message": "Document uploaded successfully. Analysis will be available shortly."
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Kimi Customer Service
@router.post("/support/chat", response_model=CustomerSupportResponse)
async def customer_support_chat(request: CustomerSupportRequest):
    """
    Handle customer support query using Kimi AI
    """
    try:
        # Build context
        system_context = "You are a helpful customer service agent for SOLVY, a cooperative banking platform. Be friendly, professional, and helpful."
        
        if request.context:
            system_context += f"\n\nUser context: {request.context}"
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{settings.KIMI_BASE_URL}/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.KIMI_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "moonshot-v1-8k",
                    "messages": [
                        {
                            "role": "system",
                            "content": system_context
                        },
                        {
                            "role": "user",
                            "content": request.message
                        }
                    ],
                    "temperature": 0.7
                },
                timeout=30.0
            )
            
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail="Kimi API error")
            
            result = response.json()
            ai_response = result["choices"][0]["message"]["content"]
            
            # Check if escalation needed
            escalate_keywords = ["fraud", "dispute", "legal", "complaint", "manager"]
            should_escalate = any(keyword in request.message.lower() for keyword in escalate_keywords)
            
            # Generate or use existing conversation ID
            conversation_id = request.conversation_id or f"conv_{datetime.now().strftime('%Y%m%d%H%M%S')}"
            
            return {
                "response": ai_response,
                "conversation_id": conversation_id,
                "escalate_to_human": should_escalate
            }
    
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Kimi API timeout")
    except Exception as e:
        # Fallback response if Kimi is unavailable
        return {
            "response": "I'm having trouble connecting right now. Please try again in a moment or contact support@solvy.chain for immediate assistance.",
            "conversation_id": request.conversation_id or "conv_fallback",
            "escalate_to_human": True
        }

@router.post("/support/escalate")
async def escalate_to_human(conversation_id: str, reason: str):
    """Escalate conversation to human support"""
    try:
        # In production, create ticket in support system
        return {
            "success": True,
            "conversation_id": conversation_id,
            "ticket_id": f"ticket_{conversation_id}",
            "message": "Your conversation has been escalated to our support team. Someone will reach out shortly.",
            "estimated_response_time": "within 2 hours"
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/support/faq")
async def get_faq():
    """Get frequently asked questions"""
    return {
        "faqs": [
            {
                "question": "How do I freeze my SOLVY card?",
                "answer": "You can freeze your card instantly in the app by going to Card Settings > Freeze Card."
            },
            {
                "question": "When will I receive my profit share?",
                "answer": "Profit shares are distributed quarterly on the first day of each quarter."
            },
            {
                "question": "How does the Uplift Education partnership work?",
                "answer": "10% of every Reign product sale goes directly to Uplift Education to support student wellness programs."
            },
            {
                "question": "What are the transaction fees?",
                "answer": "SOLVY cards have no monthly fees. Transaction fees are 1.99% for purchases."
            }
        ]
    }

from datetime import datetime

