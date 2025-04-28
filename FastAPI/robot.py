from fastapi import FastAPI
import requests

app = FastAPI()

# IP of the Raspberry Pi
RASPBERRY_PI_IP = "0,10.0.0.30:8000"  # Replace with your Raspberry Pi's IP and port
    

@app.post("/send-message/")
async def send_message_to_pi(message: str):
    """
    Sends a message to the Raspberry Pi.
    """
    try:
        # Sending POST request to Raspberry Pi's server
        response = requests.post(f"http://{RASPBERRY_PI_IP}/recieve-message", json={"message": message})
        
        # Check if Raspberry Pi responded successfully
        if response.status_code == 200:
            return {"status": "Message sent successfully!"}
        else:
            return {"status": "Failed to send message to Raspberry Pi."}
    
    except Exception as e:
        return {"status": "Error sending message", "error": str(e)}
