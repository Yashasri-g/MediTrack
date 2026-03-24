from app.extensions import db
from datetime import datetime

class Patient(db.Model):
    __tablename__ = "patients"

    id = db.Column(db.Integer, primary_key=True)  # SERIAL
    full_name = db.Column(db.String(120), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(10))
    phone = db.Column(db.String(15), unique=True, nullable=False)
    email = db.Column(db.String(120))
    blood_group = db.Column(db.String(5))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    #appointments = db.relationship("Appointment", backref="patient", lazy=True)