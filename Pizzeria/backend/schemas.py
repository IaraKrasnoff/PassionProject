from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from models import Pizza, Contact, Order, OrderItem

class PizzaSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Pizza
        load_instance = True

class ContactSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Contact
        load_instance = True

class OrderItemSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = OrderItem
        load_instance = True
    pizza = auto_field()

class OrderSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        load_instance = True
    items = auto_field()
