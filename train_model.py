import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

df = pd.read_csv("dataset.csv")

df["hour"] = (df["time_sec"] // 6) * 3 + 6


def label(total):
    if total < 8:
        return "Low"
    elif total < 15:
        return "Medium"
    else:
        return "High"

df["congestion"] = df["total"].apply(label)

X = df[["hour", "car", "bike", "bus", "truck", "total"]]
y = df["congestion"]

model = RandomForestClassifier()
model.fit(X, y)

pickle.dump(model, open("traffic_model.pkl", "wb"))

print("Model trained with hour-based prediction")