function GenerateButton({ loading, onClick }) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold transition hover:bg-blue-700 disabled:bg-slate-400"
        >
            {loading ? "Generating..." : "Generate Voice"}
        </button>
    );
}

export default GenerateButton;