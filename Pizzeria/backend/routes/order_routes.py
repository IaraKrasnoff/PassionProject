from flask import Blueprint, request, jsonify
from models import db, Order, OrderItem, Pizza
from schemas import OrderSchema
from decimal import Decimal

bp = Blueprint('order', __name__, url_prefix='/api/orders')
order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

@bp.route('', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify(orders_schema.dump(orders)), 200

@bp.route('', methods=['POST'])
def create_order():
    data = request.get_json()
    customer_name = data.get('customer_name')
    address = data.get('address')
    phone = data.get('phone')
    items = data.get('items', [])  # list of {pizza_id, quantity}

    order = Order(customer_name=customer_name, address=address, phone=phone, total=0)
    db.session.add(order)
    total = Decimal('0.00')
    for it in items:
        pizza = Pizza.query.get_or_404(it['pizza_id'])
        qty = int(it.get('quantity', 1))
        price = pizza.price
        line_total = price * qty
        total += line_total
        oi = OrderItem(order_id=order.id, pizza_id=pizza.id, quantity=qty, price=price)
        db.session.add(oi)

    order.total = total
    db.session.commit()
    return jsonify(order_schema.dump(order)), 201
