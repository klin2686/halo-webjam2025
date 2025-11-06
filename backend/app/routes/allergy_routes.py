from flask import Blueprint, jsonify, request
from sqlalchemy import select
from app.extensions import db
from app.utils.jwt_utils import token_required
from app.models import UserAllergy, Allergen
allergies_bp = Blueprint('allergies',__name__)

ALLERGEN_SET = {"milk", "eggs", 'fish', 'shellfish', 'tree nuts', 'peanuts', 'wheat', 'soybeans', 'sesame'}


@allergies_bp.route('/allergies/add', methods=['POST'])
@token_required
def add(current_user):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No json body provided'}), 400

    food_name = data.get('allergen_name').strip().lower()
    if not food_name:
        return jsonify({'error': 'No allergen_name provided'}), 400
    if food_name not in ALLERGEN_SET:
        return jsonify({'error': 'Invalid allergen_name'}), 400

    try:
        food_severity = int(data.get('severity'))
    except ValueError:
        return jsonify({'error': 'Invalid allergy severity'}), 400
    except TypeError:
        return jsonify({'error': 'No severity provided'}), 400
    if not 1 <= food_severity <= 3:
        return jsonify({'error': 'Invalid allergy severity'}), 400

    stmt = select(UserAllergy).join(Allergen).where(UserAllergy.user_id == current_user.id).where(Allergen.name == food_name)
    allergy = db.session.execute(stmt).scalar_one_or_none()

    if allergy:
        return jsonify({'error': 'Allergy already exists'}), 400

    new_user_allergy = UserAllergy(current_user.id, allergy.id, food_severity)
    db.session.add(new_user_allergy)
    db.session.commit()
    return jsonify({
        'message': 'Allergy created successfully',
        'user_allergy': allergy.to_dict
    }), 201


@allergies_bp.route('/allergies/update', methods=['PUT'])
@token_required
def update(current_user):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No json body provided'}), 400

    user_allergy_id = data.get('user_allergy_id')
    if not user_allergy_id:
        return jsonify({'error': 'No user_allergy_id provided'}), 400
    try:
        user_allergy_id = int(user_allergy_id)
    except ValueError:
        return jsonify({'error': 'user_allergy_id must be an int'}), 400

    severity = data.get('severity')
    if not severity:
        return jsonify({'error': 'No severity provided'}), 400
    try:
        severity = int(severity)
    except ValueError:
        return jsonify({'error': 'Severity must be an int'}), 400
    if not 1 <= severity <= 3:
        return jsonify({'error': 'Severity must be between 1 and 3; 1 for mild and 3 for severe'}), 400

    user_allergy = db.session.get(UserAllergy, user_allergy_id)

    if not user_allergy:
        return jsonify({'error': 'User_allergy association not found'}), 400

    if user_allergy.user_id != current_user.id:
        return jsonify({'error': 'Current user does not own the given user_allergy'}), 401

    user_allergy.severity = severity
    db.session.commit()
    return jsonify({
        'message': 'User_allergy severity updated successfully',
        'user_allergy': user_allergy.to_dict()
    }), 200


@allergies_bp.route('/allergies/delete', methods=['DELETE'])
@token_required
def delete(current_user):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No json body provided'}), 400

    user_allergy_id = data.get('user_allergy_id')
    if not user_allergy_id:
        return jsonify({'error': 'No user_allergy_id provided'}), 400
    try:
        user_allergy_id = int(user_allergy_id)
    except ValueError:
        return jsonify({'error': 'user_allergy_id must be an int'}), 400

    user_allergy = db.session.get(UserAllergy, user_allergy_id)

    if not user_allergy:
        return jsonify({'error': 'User_allergy association not found'}), 400

    if user_allergy.user_id != current_user.id:
        return jsonify({'error': 'Current user does not own the given user_allergy'}), 401

    db.session.delete(user_allergy)
    db.commit()
    return jsonify({'message': 'User_allergy successfully deleted',}), 204