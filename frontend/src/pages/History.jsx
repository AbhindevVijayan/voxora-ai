import { useEffect, useState } from "react";
import api from "../api/api";
const [showModal, setShowModal] = useState(false);
const [selectedId, setSelectedId] = useState(null);

function History() {
    const [history, setHistory] = useState([]);

    async function fetchHistory() {
        try {
            const response = await api.get("/history/");
            setHistory(response.data.history);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchHistory();
    }, []);

    async function handleDelete() {
        try {
            await api.delete(`/history/${selectedId}/`);

            fetchHistory();

            setShowModal(false);
            setSelectedId(null);

        } catch (error) {
            console.error(error);
        }
    }

    return (

        <div className="min-h-screen bg-slate-100 py-10">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Voice History
                    </h1>

                    <p className="mt-2 text-slate-500">
                        View and manage all your generated voiceovers.
                    </p>
                </div>


                {history.map((item) => (
                    <div
                        key={item.id}
                        className="mb-6 rounded-xl bg-white p-6 shadow-md"
                    >
                        <h3 className="text-xl font-semibold text-slate-800">
                            🎤 {item.voice_name}
                        </h3>

                        <p className="mt-3 text-slate-600 leading-7">
                            {item.text}
                        </p>

                        <audio
                            controls
                            className="w-full mt-5"
                            src={item.audio_url}
                        />

                        <p className="mt-4 text-sm text-slate-500">
                            {new Date(item.created_at).toLocaleString()}
                        </p>
                        <button
                            onClick={() => {
                                setSelectedId(item.id);
                                setShowModal(true);
                            }}
                            className="mt-5 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg active:translate-y-0 active:scale-95"
                        >
                            🗑 Delete
                        </button>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">

                        <h2 className="text-2xl font-bold text-slate-800">
                            Delete Voice
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Are you sure you want to delete this voice generation?
                        </p>

                        <p className="mt-1 text-sm text-red-500">
                            This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">

                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedId(null);
                                }}
                                className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </div>
    );
}

export default History;