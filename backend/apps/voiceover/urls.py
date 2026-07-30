from django.urls import path
from .views import HealthCheckView, VoiceListView, GenerateVoiceView
from .views import HealthCheckView, VoiceListView

urlpatterns = [
    path("health/", HealthCheckView.as_view(), name="health"),
    path("voices/", VoiceListView.as_view(), name="voices"),
    path("generate/", GenerateVoiceView.as_view(), name="generate-voice"),
]