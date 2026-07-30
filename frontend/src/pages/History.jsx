import { useEffect, useState } from "react";
import api from "../api/api";

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

    async function handleDelete(id) {
        try {
            await api.delete(`/history/${id}/`);
            fetchHistory();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h2>Voice History</h2>

            {history.map((item) => (
                <div key={item.id}>
                    <h3>{item.voice_name}</h3>

                    <p>{item.text}</p>

                    <audio controls src={item.audio_url} />

                    <p>{item.created_at}</p>
                    <button onClick={() => handleDelete(item.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default History;