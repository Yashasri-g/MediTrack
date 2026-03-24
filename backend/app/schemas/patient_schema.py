from marshmallow import Schema, fields, validates, ValidationError
from datetime import date

class PatientSchema(Schema):
    id = fields.Int(dump_only=True)
    full_name = fields.Str(required=True)
    dob = fields.Date(required=True)
    gender = fields.Str()
    phone = fields.Str(required=True)
    email = fields.Email(allow_none=True)
    blood_group = fields.Str()
    created_at = fields.DateTime(dump_only=True)

    @validates("dob")
    def validate_dob(self, value, **kwargs):
        today = date.today()
        if value > today:
            raise ValidationError("DOB cannot be in future.")
        age = today.year - value.year - ((today.month, today.day) < (value.month, value.day))
        if age < 0 or age > 120:
            raise ValidationError("Invalid age.")