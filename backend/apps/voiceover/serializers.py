from rest_framework import serializers


class GenerateVoiceSerializer(serializers.Serializer):
    text = serializers.CharField(
        required=True,
        max_length=5000,
    )

    voice_id = serializers.CharField(
        required=True,
    )

    model_id = serializers.CharField(
        default="eleven_multilingual_v2",
    )

    stability = serializers.FloatField(
        default=0.5,
        min_value=0.0,
        max_value=1.0,
    )

    similarity_boost = serializers.FloatField(
        default=0.75,
        min_value=0.0,
        max_value=1.0,
    )