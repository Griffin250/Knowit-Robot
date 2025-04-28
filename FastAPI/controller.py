from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel
import uvicorn
import requests
import cv2
from fastapi.middleware.cors import CORSMiddleware

camera = cv2.VideoCapture(0)

class Number(BaseModel):
    pos_fw: int = 0
    pos_rew: int = 0
    pos_left: int = 0
    pos_right: int = 0
    pause: int = 0

# Define the IP address and port of the Raspberry Pi
RASPBERRY_PI_URL = "http://10.20.30.197:8004/receive-message"

origins = [
    "http://localhost",
    "http://127.0.0.1",
    "http://127.0.0.1:8000",
    "http://localhost:8000",
    "http://localhost:3000",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/send-number")
def send_number(number: Number):
    # Create a dictionary to hold only the pressed command
    value_sent = {}

    # Check which value is greater than 0 and send that only
    if number.pos_fw > 0:
        value_sent["pos_fw"] = number.pos_fw
    elif number.pos_rew > 0:
        value_sent["pos_rew"] = number.pos_rew
    elif number.pos_left > 0:
        value_sent["pos_left"] = number.pos_left
    elif number.pos_right > 0:
        value_sent["pos_right"] = number.pos_right
    elif number.pause > 0:
        value_sent["pause"] = number.pause
    
    # Log the values sent
    print(f"Values received from frontend: {value_sent}")
    
    # Send the appropriate value to Raspberry Pi
    try:
        response = requests.post(RASPBERRY_PI_URL, json=value_sent)
        
        # Check the response from the Raspberry Pi
        if response.status_code == 200:
            return {"status": "Value forwarded to Raspberry Pi", "data": value_sent}
        else:
            return {"status": "Failed to forward value to Raspberry Pi", "error": response.text}
    
    except Exception as e:
        return {"status": "Error forwarding to Raspberry Pi", "error": str(e)}
    
def generate_video_stream():
    while True:
        success, frame = camera.read()
        if not success:
            break

        # Encode frame as JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        # Yield frame as an MJPEG stream
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.get("/video-feed")
async def video_feed():
    return Response(generate_video_stream(), media_type="multipart/x-mixed-replace; boundary=frame")



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
