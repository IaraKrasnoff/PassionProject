from flask import Blueprint, request
from models import db, Order, OrderItem, Pizza
from schemas import OrderSchema
from decimal import Decimal

bp = Blueprint('order', __name__, url_prefix='/api/orders')
order_schema = OrderSchema()

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
        oi = OrderItem(order=order, pizza_id=pizza.id, quantity=qty, price=price)
        db.session.add(oi)

    order.total = total
    db.session.commit()
    return order_schema.jsonify(order), 201
