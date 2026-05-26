import os

class Config:
    # JWT token encrypt karne ke liye secret key
    SECRET_KEY = 'mera_super_secret_password_123'
    # Uploaded files ko is folder me safe rakhenge
    UPLOAD_FOLDER = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'uploads')
    # File size limit: Max 50MB
    MAX_CONTENT_LENGTH = 50 * 1024 * 1024