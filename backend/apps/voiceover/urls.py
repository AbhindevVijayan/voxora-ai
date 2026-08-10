from django.urls import path
from .views import HealthCheckView, VoiceListView, GenerateVoiceView
from .views import HealthCheckView, VoiceListView
from .views import HistoryView
from .views import  DeleteHistoryView
urlpatterns = [
    path("health/", HealthCheckView.as_view(), name="health"),
    path("voices/", VoiceListView.as_view(), name="voices"),
    path("generate/", GenerateVoiceView.as_view(), name="generate-voice"),
    path(
    "history/",
    HistoryView.as_view(),
    name="history",
    ),
    path(
    "history/<int:pk>/",
    DeleteHistoryView.as_view(),
    name="delete-history",
    ),
]