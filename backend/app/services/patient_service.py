from app.repositories import patient_repo
from app.models.patient import Patient
from app.utils.errors import NotFoundError

def list_patients():
    return patient_repo.get_all()

def get_patient(patient_id):
    patient = patient_repo.get_by_id(patient_id)
    if not patient:
        raise NotFoundError("Patient not found")
    return patient

def create_patient(data):
    return patient_repo.create(data)

def update_patient(patient_id, data):
    patient = get_patient(patient_id)
    return patient_repo.update(patient, data)

def delete_patient(patient_id):
    patient = get_patient(patient_id)
    patient_repo.delete(patient)