from flask import Blueprint, request, jsonify
from datetime import datetime
import logging

from kimi_client import send_message

kimi_bp = Blueprint('kimi_support', __name__)

logger = logging.getLogger(__name__)


@kimi_bp.route('/api/support/kimi', methods=['POST', 'OPTIONS'])
def support_kimi():
    if request.method == 'OPTIONS':
        return '', 204

    try:
        data = request.get_json() or {}
        member_id = data.get('member_id', 'anonymous')
        inquiry = data.get('message', '')
        channel = data.get('channel', 'chat')

        if not inquiry:
            return jsonify({'success': False, 'error': 'No message provided'}), 400

        # Optional context can be provided by caller
        context = data.get('context')

        # Call Kimi client
        kimi_resp = send_message(member_id, inquiry, channel=channel, context=context)

        # Record minimal log
        logger.info('Kimi support request: member=%s channel=%s time=%s', member_id, channel, datetime.utcnow().isoformat())

        if not kimi_resp.get('success'):
            return jsonify({'success': False, 'error': kimi_resp.get('error', 'unknown')}), 500

        return jsonify({
            'success': True,
            'reply': kimi_resp.get('reply'),
            'source': kimi_resp.get('source', 'kimi'),
            'raw': kimi_resp.get('raw')
        })

    except Exception as e:
        logger.exception('Kimi support endpoint failed')
        return jsonify({'success': False, 'error': str(e)}), 500
