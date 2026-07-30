import api from "./api/api";
import GenerateButton from "./components/GenerateButton";
import { useEffect, useState } from "react";
import TextInput from "./components/TextInput";
import VoiceSelector from "./components/VoiceSelector";

function App() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [audioUrl, setAudioUrl] = useState("");


  useEffect(() => {
    async function fetchVoices() {
      try {
        const response = await api.get("voices/");
        setVoices(response.data.voices);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVoices();
  }, []);

  return (
    <div>
      <h1>High Fidelity Voiceover Generator</h1>
      <TextInput
        value={text}
        onChange={setText}
      />
      <VoiceSelector
        voices={voices}
        value={selectedVoice}
        onChange={setSelectedVoice}
      />

      <GenerateButton
        loading={loading}
        onClick={handleGenerate}
      />
      {audioUrl && (
        <audio
          controls
          src={audioUrl}
        />
      )}
    </div>
  );
}

export default App;
async function handleGenerate() {
  try {
    setLoading(true);

    const response = await api.post("/generate/", {
      text,
      voice_id: selectedVoice,
    });

    setAudioUrl("http://127.0.0.1:8000" + response.data.audio_url);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}