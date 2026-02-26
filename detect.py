from ultralytics import YOLO
import cv2
import pandas as pd


model = YOLO("yolov8n.pt")

cap = cv2.VideoCapture("traffic.mp4")

frame_count = 0
data = []

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame_count += 1

    if frame_count % 30 == 0:
        results = model(frame)

        car = bike = bus = truck = 0

        for r in results:
            for box in r.boxes:
                cls = int(box.cls[0])
                label = model.names[cls]

                if label == "car":
                    car += 1
                elif label == "motorcycle":
                    bike += 1
                elif label == "bus":
                    bus += 1
                elif label == "truck":
                    truck += 1

        total = car + bike + bus + truck

        data.append([frame_count//30, car, bike, bus, truck, total])

cap.release()

df = pd.DataFrame(data, columns=["time_sec", "car", "bike", "bus", "truck", "total"])
df.to_csv("dataset.csv", index=False)

print("Dataset saved as dataset.csv")