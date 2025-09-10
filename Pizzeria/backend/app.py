from flask import Flask
from config import Config
from models import db
from flask_migrate import Migrate
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    db.init_app(app)
    migrate = Migrate(app, db)

    # register blueprints
    from routes.about_routes import bp as about_bp
    from routes.contact_routes import bp as contact_bp
    from routes.pizza_routes import bp as pizza_bp
    from routes.order_routes import bp as order_bp

    app.register_blueprint(about_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(pizza_bp)
    app.register_blueprint(order_bp)

    @app.route('/')
    def index():
        return {"message": "Pizzeria API running"}, 200

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
