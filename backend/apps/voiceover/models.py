from django.db import models


class VoiceGeneration(models.Model):
    voice_id = models.CharField(max_length=100)
    voice_name = models.CharField(max_length=255)

    text = models.TextField()

    audio_file = models.FileField(
        upload_to="generated_voices/"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.voice_name} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"