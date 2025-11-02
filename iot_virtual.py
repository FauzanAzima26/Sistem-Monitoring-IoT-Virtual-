import requests, random, json, time

API_URL = "https://sistem-monitoring-iot-virtual-production.up.railway.app/data"
AUTH_TOKEN = "PPKOrmawa.12"

while True:
    data = {
        "temperature": round(random.uniform(25, 35), 2),
        "humidity": round(random.uniform(50, 90), 2)
    }
    headers = {
        "Authorization": f"Bearer {AUTH_TOKEN}",
        "Content-Type": "application/json"
    }
    r = requests.post(API_URL, data=json.dumps(data), headers=headers)
    print("Send:", data, "| Status:", r.status_code)
    time.sleep(10)