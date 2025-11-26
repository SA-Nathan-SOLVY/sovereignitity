import os
import requests
import logging

KIMI_API_KEY = os.getenv('KIMI_API_KEY')
KIMI_BASE_URL = os.getenv('KIMI_BASE_URL', 'https://api.moonshot.cn/v1')

logger = logging.getLogger(__name__)


def send_message(member_id, message, channel='chat', context=None, timeout=20):
    """
    Send a message to Kimi and return the assistant reply.

    If `KIMI_API_KEY` is not set, returns a mocked reply for local development.
    """
    # Mock fallback when no API key is configured
    if not KIMI_API_KEY:
        logger.info('KIMI_API_KEY not set — returning mock response')
        mock = {
            'success': True,
            'source': 'mock',
            'reply': f"Hello {member_id}! This is a mock Kimi reply. Set `KIMI_API_KEY` to enable live responses.",
            'metadata': {}
        }
        return mock

    # Build payload according to integration doc structure (generic POST to chat endpoint)
    url = f"{KIMI_BASE_URL}/chat/completions"
    headers = {
        'Authorization': f'Bearer {KIMI_API_KEY}',
        'Content-Type': 'application/json'
    }

    payload = {
        'model': os.getenv('KIMI_MODEL', 'moonshot-v1-128k'),
        'messages': [
            {'role': 'system', 'content': os.getenv('KIMI_SYSTEM_PROMPT', 'You are the SOVEREIGNITITY™ Sovereign Concierge, providing exceptional customer service.')},
            {'role': 'user', 'content': message}
        ],
        'max_tokens': int(os.getenv('KIMI_MAX_TOKENS', '1024')),
        'temperature': float(os.getenv('KIMI_TEMPERATURE', '0.3')),
        'metadata': {
            'member_id': member_id,
            'channel': channel
        }
    }

    try:
        resp = requests.post(url, json=payload, headers=headers, timeout=timeout)
        resp.raise_for_status()
        data = resp.json()

        # Best-effort extraction of assistant message
        reply = None
        if isinstance(data, dict):
            # Try common fields
            if 'choices' in data and data['choices']:
                # follow DeepSeek-like shape
                reply = data['choices'][0].get('message', {}).get('content') or data['choices'][0].get('text')
            elif 'message' in data:
                reply = data['message'].get('content') or data.get('message')
            elif 'result' in data and isinstance(data['result'], str):
                reply = data['result']

        if reply is None:
            reply = str(data)

        return {
            'success': True,
            'source': 'kimi',
            'reply': reply,
            'raw': data
        }

    except Exception as e:
        logger.exception('Kimi send_message failed')
        return {
            'success': False,
            'error': str(e)
        }
