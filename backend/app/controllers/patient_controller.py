from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError

from app.schemas.patient_schema import PatientSchema
from app.services import patient_service
from app.extensions import db
from app.utils.errors import AppError, NotFoundError

patient_bp = Blueprint("patients", __name__, url_prefix="/api/patients")

schema = PatientSchema()
many_schema = PatientSchema(many=True)

@patient_bp.route("", methods=["GET"])
@patient_bp.route("/", methods=["GET"])
def list_patients():
    patients = patient_service.list_patients()
    return jsonify(many_schema.dump(patients)), 200

@patient_bp.route("/<int:patient_id>", methods=["GET"])
def get_patient(patient_id):
    patient = patient_service.get_patient(patient_id)
    return jsonify(schema.dump(patient)), 200

@patient_bp.route("", methods=["POST"])
@patient_bp.route("/", methods=["POST"])
def create_patient():
    payload = request.get_json(silent=True) or {}
    data = schema.load(payload)  # full validation

    try:
        patient = patient_service.create_patient(data)
        return jsonify(schema.dump(patient)), 201
    except IntegrityError:
        db.session.rollback()
        # phone is unique
        raise AppError("Phone already exists", status_code=409)

@patient_bp.route("/<int:patient_id>", methods=["PUT"])
def update_patient(patient_id):
    payload = request.get_json(silent=True) or {}
    data = schema.load(payload, partial=True)  # allow partial updates

    try:
        patient = patient_service.update_patient(patient_id, data)
        return jsonify(schema.dump(patient)), 200
    except IntegrityError:
        db.session.rollback()
        raise AppError("Phone already exists", status_code=409)

@patient_bp.route("/<int:patient_id>", methods=["DELETE"])
def delete_patient(patient_id):
    patient_service.delete_patient(patient_id)
    return jsonify({"message": "Patient deleted"}), 200