from app.models.patient import Patient
from app.extensions import db

def get_all():
    return Patient.query.all()

def get_by_id(patient_id):
    return Patient.query.get(patient_id)

def create(data):
    patient = Patient(**data)
    db.session.add(patient)
    db.session.commit()
    return patient

def update(patient, data):
    for key, value in data.items():
        setattr(patient, key, value)
    db.session.commit()
    return patient

def delete(patient):
    db.session.delete(patient)
    db.session.commit()