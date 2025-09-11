from flask import Blueprint, jsonify
from models import Pizza
from schemas import PizzaSchema
from models import db

bp = Blueprint('pizza', __name__, url_prefix='/api/pizzas')
pizza_schema = PizzaSchema(many=False)
pizzas_schema = PizzaSchema(many=True)

@bp.route('', methods=['GET'])
def list_pizzas():
    pizzas = Pizza.query.all()
    return jsonify(pizzas_schema.dump(pizzas))

@bp.route('/<int:pizza_id>', methods=['GET'])
def get_pizza(pizza_id):
    pizza = Pizza.query.get_or_404(pizza_id)
    return jsonify(pizza_schema.dump(pizza))
