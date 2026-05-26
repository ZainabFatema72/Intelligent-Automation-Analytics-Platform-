import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, r2_score

def train_and_predict(file_path, target_column):
    # Data load karo
    if file_path.endswith('.csv'):
        df = pd.read_csv(file_path)
    else:
        df = pd.read_excel(file_path)

    # Khali rows ko hatao
    df = df.dropna()

    # Agar koi text column hai toh use numbers (categorical codes) me badlo
    for col in df.select_dtypes(include=['object']).columns:
        df[col] = df[col].astype('category').cat.codes

    if target_column not in df.columns:
        return {"error": f"Target column '{target_column}' data me nahi mila."}

    # X = Input features (baki saare columns), y = Target (jiski prediction karni hai)
    X = df.drop(columns=[target_column])
    y = df[target_column]

    # Data ko Train (80%) aur Test (20%) me baanto
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    unique_targets = len(np.unique(y))
    
    # AUTOMATION ML LOGIC:
    # Agar target column me bohot kam unique values hain (jaise Churn: Yes/No, ya Fraud: 0/1) -> Classification model
    if unique_targets < 10:
        model = RandomForestClassifier()
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        score = accuracy_score(y_test, preds)
        metric_name = "Accuracy Score"
    # Agar target continuous number hai (jaise Price, Revenue, Sales) -> Regression model
    else:
        model = LinearRegression()
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        score = r2_score(y_test, preds)
        metric_name = "R-Squared (Fit) Value"

    return {
        "model_applied": type(model).__name__,
        "metric": metric_name,
        "score": round(float(score), 4) * 100 # Percentage me badla
    }