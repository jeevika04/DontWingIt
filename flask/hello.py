from flask import Flask, json, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello_world():
    return 'Hello, World!'