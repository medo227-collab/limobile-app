from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Stockage en mémoire (temporaire pour tests)
users_db = {}
accounts_db = {}
transactions_db = {}

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    phone = data.get('phone_number')
    pin = data.get('pin')
    
    if not phone or len(pin) != 4:
        return jsonify({'message': 'Données invalides'}), 400
    
    if phone in users_db:
        return jsonify({'message': 'Numéro déjà enregistré'}), 409
    
    user_id = len(users_db) + 1
    users_db[phone] = {
        'id': user_id,
        'phone': phone,
        'pin_hash': generate_password_hash(pin),
        'created_at': datetime.utcnow().isoformat()
    }
    
    return jsonify({
        'message': 'Utilisateur enregistré',
        'user_id': user_id,
        'user': {'id': user_id, 'phone_number': phone}
    }), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    phone = data.get('phone_number')
    pin = data.get('pin')
    
    if phone not in users_db:
        return jsonify({'message': 'Numéro ou PIN incorrect'}), 401
    
    user = users_db[phone]
    if not check_password_hash(user['pin_hash'], pin):
        return jsonify({'message': 'Numéro ou PIN incorrect'}), 401
    
    return jsonify({
        'message': 'Connexion réussie',
        'user_id': user['id'],
        'user': {'id': user['id'], 'phone_number': phone}
    }), 200

@app.route('/api/user/<int:user_id>/accounts', methods=['GET'])
def get_accounts(user_id):
    user_accounts = [acc for acc in accounts_db.values() if acc['user_id'] == user_id]
    return jsonify({'user_id': user_id, 'accounts': user_accounts}), 200

@app.route('/api/user/<int:user_id>/add-account', methods=['POST'])
def add_account(user_id):
    data = request.json
    operator = data.get('operator')
    
    if operator not in ['airtel', 'moov', 'zamani']:
        return jsonify({'message': 'Opérateur invalide'}), 400
    
    key = f"{user_id}_{operator}"
    if key in accounts_db:
        return jsonify({'message': f'Compte {operator} existe déjà'}), 409
    
    accounts_db[key] = {
        'id': len(accounts_db) + 1,
        'user_id': user_id,
        'operator': operator,
        'balance': 1000
    }
    
    return jsonify({'message': f'Compte {operator} ajouté'}), 201

@app.route('/api/user/<int:user_id>/transactions', methods=['GET'])
def get_transactions(user_id):
    user_txs = [tx for tx in transactions_db.values() if tx['user_id'] == user_id]
    return jsonify({'transactions': user_txs}), 200

@app.route('/api/transfer', methods=['POST'])
def transfer():
    data = request.json
    user_id = data.get('user_id')
    operator = data.get('source_operator')
    dest = data.get('destination_number')
    amount = data.get('amount')
    
    key = f"{user_id}_{operator}"
    if key not in accounts_db:
        return jsonify({'message': 'Compte source non trouvé'}), 404
    
    account = accounts_db[key]
    if account['balance'] < amount:
        return jsonify({'message': 'Solde insuffisant'}), 400
    
    account['balance'] -= amount
    tx_id = len(transactions_db) + 1
    transactions_db[str(tx_id)] = {
        'id': tx_id,
        'user_id': user_id,
        'type': 'transfer',
        'description': f'Transfert vers {dest}',
        'amount': -amount,
        'operator': operator,
        'date': datetime.utcnow().isoformat()
    }
    
    return jsonify({'message': 'Transfert effectué', 'transaction_id': tx_id}), 200

@app.route('/api/forfait', methods=['POST'])
def buy_forfait():
    data = request.json
    user_id = data.get('user_id')
    operator = data.get('operator')
    amount = data.get('package_id')  # Simplifié
    
    key = f"{user_id}_{operator}"
    if key not in accounts_db:
        return jsonify({'message': 'Compte non trouvé'}), 404
    
    account = accounts_db[key]
    account['balance'] -= 100  # Forfait coûte 100F
    
    tx_id = len(transactions_db) + 1
    transactions_db[str(tx_id)] = {
        'id': tx_id,
        'user_id': user_id,
        'type': 'forfait',
        'description': 'Achat de forfait',
        'amount': -100,
        'operator': operator,
        'date': datetime.utcnow().isoformat()
    }
    
    return jsonify({'message': 'Forfait acheté'}), 200

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
