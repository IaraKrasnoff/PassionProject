from flask import Blueprint, request, jsonify
from models import db, Contact
from schemas import ContactSchema

bp = Blueprint('contact', __name__, url_prefix='/api/contacts')
contact_schema = ContactSchema()

@bp.route('', methods=['POST'])
def create_contact():
    data = request.get_json()
    contact = Contact(
        name=data.get('name'),
        email=data.get('email'),
        phone=data.get('phone'),
        message=data.get('message')
    )
    db.session.add(contact)
    db.session.commit()
    return contact_schema.jsonify(contact), 201
