from rest_framework import serializers
from .models import VoiceGeneration


class VoiceGenerationSerializer(serializers.ModelSerializer):
    audio_url = serializers.SerializerMethodField()

    class Meta:
        model = VoiceGeneration
        fields = [
            "id",
            "voice_name",
            "text",
            "audio_url",
            "created_at",
        ]

    def get_audio_url(self, obj):
        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(obj.audio_file.url)

        return obj.audio_file.url