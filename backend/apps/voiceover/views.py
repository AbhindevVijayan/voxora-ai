from rest_framework.response import Response
from rest_framework.views import APIView

from .services.elevenlabs import ElevenLabsService
from django.http import HttpResponse
from rest_framework import status
from .serializers import GenerateVoiceSerializer
import uuid

from django.core.files.base import ContentFile

from .models import VoiceGeneration

class HealthCheckView(APIView):
    def get(self, request):
        return Response(
            {
                "status": "success",
                "message": "Voiceover API is running!",
            }
        )


class VoiceListView(APIView):
    def get(self, request):
        service = ElevenLabsService()
        voices = service.get_voices()

        return Response(
            {
                "success": True,
                "count": len(voices),
                "voices": voices,
            }
        )
        
class GenerateVoiceView(APIView):
    def post(self, request):
        serializer = GenerateVoiceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            service = ElevenLabsService()

            data = serializer.validated_data

            audio = service.generate_speech(
                text=data["text"],
                voice_id=data["voice_id"],
                model_id=data["model_id"],
                stability=data["stability"],
                similarity_boost=data["similarity_boost"],
            )

            filename = f"{uuid.uuid4()}.mp3"

            generation = VoiceGeneration(
                voice_id=data["voice_id"],
                voice_name=data["voice_id"],  # We'll improve this shortly
                text=data["text"],
            )

            generation.audio_file.save(
                filename,
                ContentFile(audio),
                save=True,
            )

            return Response(
                {
                    "success": True,
                    "id": generation.id,
                    "audio_url": generation.audio_file.url,
                    "message": "Voice generated successfully.",
                }
            )

        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": str(e),
                },
                status=500,
            )