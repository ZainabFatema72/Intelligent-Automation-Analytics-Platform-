import pandas as pd
import numpy as np

def clean_and_analyze(file_path):
    # Check karo ki file CSV hai ya Excel aur us hisab se read karo
    if file_path.endswith('.csv'):
        df = pd.read_csv(file_path)
    else:
        df = pd.read_excel(file_path)

    # 1. DATA CLEANING: Duplicate rows ko delete karo
    df.drop_duplicates(inplace=True)
    
    # 2. MISSING VALUES HANDLING: Khali jagah ko automatic bharo
    for col in df.columns:
        if df[col].dtype in ['int64', 'float64']:
            # Agar number hai toh pure column ka beech ka number (median) bhar do
            df[col] = df[col].fillna(df[col].median())
        else:
            # Agar text/string hai toh jo sabse jyada baar aaya (mode) wo bhar do
            df[col] = df[col].fillna(df[col].mode()[0] if not df[col].mode().empty else "Unknown")

    # 3. STATISTICAL ANALYSIS: Total rows aur columns gino
    total_records = int(df.shape[0])
    total_columns = int(df.shape[1])
    
    # Sirf numbers wale columns ki summary nikaalo (Mean, Max, Min)
    numeric_df = df.select_dtypes(include=[np.number])
    summary_stats = {}
    for col in numeric_df.columns:
        summary_stats[col] = {
            "mean": round(float(numeric_df[col].mean()), 2),
            "max": round(float(numeric_df[col].max()), 2),
            "min": round(float(numeric_df[col].min()), 2)
        }

    # Frontend me chart dikhane ke liye pehle 15 rows ka data nikaalo
    chart_data = df.head(15).to_dict(orient='records')

    return {
        "rows": total_records,
        "cols": total_columns,
        "stats": summary_stats,
        "preview": chart_data
    }