import os

import requests
from requests.exceptions import RequestException


class ElevenLabsService:
    BASE_URL = "https://api.elevenlabs.io/v1"

    def __init__(self):
        self.api_key = os.getenv("ELEVENLABS_API_KEY")

        if not self.api_key:
            raise ValueError("ELEVENLABS_API_KEY is not configured.")

        self.headers = {
            "xi-api-key": self.api_key,
            "Content-Type": "application/json",
        }

    def get_voices(self):
        try:
            url = f"{self.BASE_URL}/voices"

            response = requests.get(
                url,
                headers=self.headers,
                timeout=30,
            )

            response.raise_for_status()

            data = response.json()

            voices = []

            for voice in data.get("voices", []):
                labels = voice.get("labels", {})

                voices.append(
                    {
                        "voice_id": voice.get("voice_id"),
                        "name": voice.get("name"),
                        "category": voice.get("category"),
                        "language": labels.get("language"),
                        "gender": labels.get("gender"),
                        "accent": labels.get("accent"),
                        "description": voice.get("description"),
                        "preview_url": voice.get("preview_url"),
                    }
                )

            return voices

        except RequestException as e:
            raise Exception(f"Failed to fetch voices: {str(e)}")

    def generate_speech(
        self,
        text,
        voice_id,
        model_id,
        stability,
        similarity_boost,
    ):
        try:
            url = f"{self.BASE_URL}/text-to-speech/{voice_id}"

            payload = {
                "text": text,
                "model_id": model_id,
                "voice_settings": {
                    "stability": stability,
                    "similarity_boost": similarity_boost,
                },
            }

            response = requests.post(
                url,
                headers=self.headers,
                json=payload,
                timeout=60,
            )

            response.raise_for_status()
            return response.content

        except RequestException as e:
            raise Exception(f"Failed to generate speech: {str(e)}")