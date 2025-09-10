import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-key")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI", "mysql+pymysql://root:password@db:3306/pizzaria")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
