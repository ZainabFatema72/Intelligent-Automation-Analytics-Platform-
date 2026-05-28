import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
import bcrypt
import jwt
import datetime
from config import Config
from analytics.processor import clean_and_analyze
from ml.engine import train_and_predict

app = Flask(__name__)
app.config.from_object(Config)
# Purane CORS(app) ko hatao aur ye dalo:
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Agar uploads folder na ho toh auto-create karo
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Database Connection Function
def get_db_connection():
    return pymysql.connect(
        host=os.environ.get('DB_HOST'),
        port=int(os.environ.get('DB_PORT', 3306)),
        user=os.environ.get('DB_USER'),
        password=os.environ.get('DB_PASSWORD'),
        database=os.environ.get('DB_NAME'),
        cursorclass=pymysql.cursors.DictCursor
    )
# Database Connection Function ke neeche ye dalo:
@app.route('/')
def home():
    return {"status": "Server is up and running!", "message": "Ready for React API requests."}

# --- 1. USER LOGIN API (UPDATED) ---
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    conn = get_db_connection()
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
    conn.close()

    # Agar user mil jata hai, toh seedhe check karo password match ho raha hai ya nahi
    if user:
        # Testing ko aasan banane ke liye: agar input password 'admin123' hai ya database ke hash se match ho jaye
        if password == 'admin123' or user['password_hash'] == password:
            token = jwt.encode({
                'user_id': user['id'],
                'role': user['role'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
            }, app.config['SECRET_KEY'], algorithm='HS256')
            
            return jsonify({
                "token": token, 
                "role": user['role'], 
                "username": user['username']
            }), 200
            
    return jsonify({"error": "Invalid email or password"}), 401


# --- 2. FILE UPLOAD & AUTOMATIC CLEANING API ---
@app.route('/api/data/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    # File ko uploads folder me save karo
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    try:
        # Pandas Engine ko call karo data saaf karne ke liye
        analysis_result = clean_and_analyze(file_path)
        
        # Database me entry save karo
        conn = get_db_connection()
        with conn.cursor() as cursor:
            sql = "INSERT INTO datasets (file_name, file_path, row_count, col_count) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (file.filename, file_path, analysis_result['rows'], analysis_result['cols']))
            dataset_id = cursor.lastrowid
            conn.commit()
        conn.close()

        return jsonify({
            "message": "File processed successfully!",
            "dataset_id": dataset_id,
            "filename": file.filename,
            "data": analysis_result
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# --- 3. MACHINE LEARNING PREDICTION API ---
@app.route('/api/ml/predict', methods=['POST'])
def predict_target():
    data = request.json
    file_name = data.get('file_name')
    target_column = data.get('target_column')
    
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
    if not os.path.exists(file_path):
        return jsonify({"error": "File server par nahi mili. Kripya pehle upload karein."}), 404

    try:
        # ML Engine ko call karo train karne ke liye
        ml_results = train_and_predict(file_path, target_column)
        return jsonify(ml_results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)