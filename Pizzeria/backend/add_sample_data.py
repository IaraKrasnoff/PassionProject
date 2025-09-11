#!/usr/bin/env python3

from app import create_app
from models import db, Pizza
from decimal import Decimal

def add_sample_data():
    app = create_app()
    
    with app.app_context():
        # Check if pizzas already exist
        existing_pizzas = Pizza.query.count()
        if existing_pizzas > 0:
            print(f"Database already has {existing_pizzas} pizzas. Skipping...")
            return
        
        # Add some sample pizzas
        pizzas = [
            {'name': 'Margherita', 'description': 'Fresh tomato, mozzarella, basil', 'price': Decimal('12.99'), 'is_vegetarian': True},
            {'name': 'Pepperoni', 'description': 'Pepperoni, mozzarella, tomato sauce', 'price': Decimal('14.99'), 'is_vegetarian': False},
            {'name': 'Vegetarian', 'description': 'Bell peppers, mushrooms, onions, olives', 'price': Decimal('13.99'), 'is_vegetarian': True},
            {'name': 'Four Cheese', 'description': 'Mozzarella, parmesan, gorgonzola, ricotta', 'price': Decimal('15.99'), 'is_vegetarian': True},
            {'name': 'Meat Lovers', 'description': 'Pepperoni, sausage, ham, bacon', 'price': Decimal('17.99'), 'is_vegetarian': False}
        ]

        for pizza_data in pizzas:
            pizza = Pizza(**pizza_data)
            db.session.add(pizza)

        db.session.commit()
        print(f'Successfully added {len(pizzas)} sample pizzas!')

if __name__ == '__main__':
    add_sample_data()
