import pickle
import pandas as pd

model = pickle.load(open("traffic_model.pkl", "rb"))

junctions = ["A", "B", "C", "D", "E", "F"]


user_hour = int(input("Enter hour (6,9,12,15,18,21): "))

for j in junctions:
    df = pd.read_csv(f"junction_{j}.csv")
    
    
    df["hour"] = (df["time_sec"] // 6) * 3 + 6
    
    
    rows = df[df["hour"] == user_hour]
    
    if rows.empty:
        print(f"Junction {j} → No data for this hour")
        continue
    

    avg_row = rows.mean(numeric_only=True)
    
    features = [[
        user_hour,
        avg_row["car"],
        avg_row["bike"],
        avg_row["bus"],
        avg_row["truck"],
        avg_row["total"]
    ]]
    
    prediction = model.predict(features)[0]
    
    print(f"Junction {j} at {user_hour}:00 → {prediction}")