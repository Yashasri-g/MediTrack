from flask import Flask, jsonify
from flask_cors import CORS
from marshmallow import ValidationError

from app.config import Config
from app.extensions import db, migrate
from app.utils.errors import AppError


def create_app():
    flask_app = Flask(__name__)
    flask_app.config.from_object(Config)

    # init extensions
    db.init_app(flask_app)
    migrate.init_app(flask_app, db)

    # import models so SQLAlchemy registers them
    import app.models  # noqa: F401

    # CORS for React
    CORS(flask_app, resources={r"/api/*": {"origins": ["http://localhost:5173"]}})

    # register blueprints
    from app.controllers.patient_controller import patient_bp
    flask_app.register_blueprint(patient_bp)

    # marshmallow validation errors -> JSON
    def handle_validation_error(err: ValidationError):
        return jsonify({"errors": err.messages}), 400

    flask_app.register_error_handler(ValidationError, handle_validation_error)

    # app errors -> JSON
    def handle_app_error(error: AppError):
        response = {"error": error.message, **(error.payload or {})}
        return jsonify(response), error.status_code

    flask_app.register_error_handler(AppError, handle_app_error)

    return flask_app
