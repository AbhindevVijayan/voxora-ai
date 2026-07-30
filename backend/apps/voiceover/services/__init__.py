import os

class ElevenLabsService:
    BASE_URL = "https://api.elevenlabs.io/v1"

    def __init__(self):
        self.api_key = os.getenv("ELEVENLABS_API_KEY")

        print("API Key Loaded:", self.api_key)

        self.headers = {
            "xi-api-key": self.api_key,
            "Content-Type": "application/json",
        }