class AppError(Exception):
    """Base application error."""
    status_code = 400

    def __init__(self, message="Bad Request", status_code=None, payload=None):
        super().__init__(message)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload or {}


class NotFoundError(AppError):
    """Resource not found."""
    status_code = 404

    def __init__(self, message="Not Found", payload=None):
        super().__init__(message=message, status_code=404, payload=payload)