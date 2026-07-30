import api from "../api/api";
import GenerateButton from "../components/GenerateButton";
import { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import VoiceSelector from "../components/VoiceSelector";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";


function Home() {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const [stability, setStability] = useState(0.5);
    const [similarityBoost, setSimilarityBoost] = useState(0.75);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const currentVoice = voices.find(
        (voice) => voice.voice_id === selectedVoice
    );


    async function fetchVoices() {
        try {
            const response = await api.get("/voices/");
            setVoices(response.data.voices);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchVoices();

    }, []);

    async function handleGenerate() {
        if (!text.trim()) {
            toast.error("Please enter some text.");
            return;
        }

        if (!selectedVoice) {
            toast.error("Please select a voice.");
            return;
        }
        const toastId = toast.loading("Generating voice...");

        try {
            setLoading(true);

            const response = await api.post("/generate/", {
                text,
                voice_id: selectedVoice,
                stability,
                similarity_boost: similarityBoost,
            });

            setAudioUrl("http://127.0.0.1:8000" + response.data.audio_url);

            toast.success("Voice generated successfully!", {
                id: toastId,
            });

        } catch (error) {
            toast.error("Failed to generate voice.", {
                id: toastId,
            });

            console.error(error);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div>

            <div className="min-h-screen bg-slate-100 py-10">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-3xl font-bold text-slate-800">
                        Generate AI Voice
                    </h2>

                    <p className="text-slate-500 mt-2 mb-8">
                        Convert text into natural sounding speech using ElevenLabs.
                    </p>

                    <TextInput
                        value={text}
                        onChange={setText}
                    />

                    <VoiceSelector
                        voices={voices}
                        value={selectedVoice}
                        onChange={setSelectedVoice}
                    />
                    {currentVoice && (
                        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">

                            <h3 className="text-lg font-semibold text-slate-800">
                                {currentVoice.name}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                {currentVoice.description}
                            </p>

                            <p className="mt-3 text-sm font-medium text-slate-500">
                                👤 {currentVoice.gender} • 🌍 {currentVoice.accent}
                            </p>
                            <audio
                                controls
                                className="w-full mt-4"
                                src={currentVoice.preview_url}
                            />
                        </div>
                    )}
                    <div className="mt-6 rounded-xl border border-slate-200 bg-white">

                        <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="flex w-full items-center justify-between p-4 text-left font-semibold text-slate-700"
                        >
                            <span>⚙️ Advanced Settings</span>
                            <ChevronDown
                                className={`transition-transform duration-300 ${showAdvanced ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {showAdvanced && (
                            <div className="border-t border-slate-200 p-4">

                                {/* We'll add the sliders here */
                                    <div className="mb-6">
                                        <div className="flex justify-between">
                                            <label className="font-medium text-slate-700">
                                                Stability
                                            </label>

                                            <span className="text-slate-500">
                                                {stability.toFixed(2)}
                                            </span>
                                        </div>

                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={stability}
                                            onChange={(e) => setStability(Number(e.target.value))}
                                            className="mt-2 w-full accent-blue-600"
                                        />
                                    </div>
                                }
                                <div>
                                    <div className="flex justify-between">
                                        <label className="font-medium text-slate-700">
                                            Similarity Boost
                                        </label>

                                        <span className="text-slate-500">
                                            {similarityBoost.toFixed(2)}
                                        </span>

                                    </div>

                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={similarityBoost}
                                        onChange={(e) => setSimilarityBoost(Number(e.target.value))}
                                        className="mt-2 w-full accent-blue-600"
                                    />
                                </div>
                                <p className="mt-1 text-sm text-slate-500">
                                    Controls how closely the generated voice matches the selected voice profile.
                                </p>

                            </div>
                        )}

                    </div>

                    <div className="mt-6">
                        <GenerateButton
                            loading={loading}
                            onClick={handleGenerate}
                        />
                    </div>

                    {audioUrl && (
                        <div className="mt-8 border-t pt-6">
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">
                                Generated Audio
                            </h3>

                            <audio
                                controls
                                className="w-full"
                                src={audioUrl}
                            />
                            <a
                                href={audioUrl}
                                download
                                className="inline-block mt-4 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                            >
                                ⬇ Download Audio
                            </a>
                        </div>
                    )}




                </div>
            </div>
        </div>
    );
}

export default Home;