from flask import Blueprint, request, jsonify
import os
import stripe

stripe_bp = Blueprint('stripe_payments', __name__)


@stripe_bp.route('/create-payment-intent', methods=['POST', 'OPTIONS'])
def create_payment_intent():
    if request.method == 'OPTIONS':
        return '', 204

    try:
        data = request.json or {}
        # Expect amount in smallest currency unit (e.g., cents)
        amount = int(data.get('amount', 0))
        currency = data.get('currency', 'usd')

        stripe_api_key = os.getenv('STRIPE_SECRET_KEY')

        # If no Stripe key is configured, return a mock response for demo/testing.
        if not stripe_api_key:
            mock_id = f"mock_intent_{amount}_{currency}_{int(os.times()[4])}"
            mock_client_secret = f"mock_client_secret_{mock_id}"
            return jsonify({'success': True, 'client_secret': mock_client_secret, 'id': mock_id, 'mock': True})

        stripe.api_key = stripe_api_key

        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            automatic_payment_methods={'enabled': True},
        )

        return jsonify({'success': True, 'client_secret': intent.client_secret, 'id': intent.id})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400


    @stripe_bp.route('/confirm-payment-intent', methods=['POST', 'OPTIONS'])
    def confirm_payment_intent():
        if request.method == 'OPTIONS':
            return '', 204

        try:
            data = request.json or {}
            intent_id = data.get('intent_id')
            if not intent_id:
                return jsonify({'success': False, 'error': 'intent_id required'}), 400

            stripe_api_key = os.getenv('STRIPE_SECRET_KEY')

            # If mock intent id, return success immediately for demo
            if intent_id and intent_id.startswith('mock_intent_'):
                return jsonify({'success': True, 'status': 'succeeded', 'id': intent_id, 'mock': True})

            if not stripe_api_key:
                return jsonify({'success': False, 'error': 'Stripe secret key not configured on server'}), 500

            stripe.api_key = stripe_api_key

            # For demo/testing: confirm using Stripe's test payment method
            # NOTE: This approach is for demo only. In production, confirm on the client with a real payment method.
            confirmed = stripe.PaymentIntent.confirm(intent_id, payment_method='pm_card_visa')

            return jsonify({'success': True, 'status': confirmed.status, 'id': confirmed.id})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 400
