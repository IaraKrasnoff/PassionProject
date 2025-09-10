from flask import Blueprint, jsonify

bp = Blueprint('about', __name__, url_prefix='/api/about')

@bp.route('', methods=['GET'])
def get_about():
    about = {
        "name": "Pizzaria Don Chevico",
        "description": "Pizzaria artesanal no coração do bairro — massas finas e ingredientes selecionados. Entregas e retirada.",
        "hours": "Seg-Sex 17:00-23:00, Sáb-Dom 12:00-24:00",
        "address": "Rua Exemplo, 123, Cidade, Brasil",
        "phone": "+55 11 99999-9999"
    }
    return jsonify(about)
