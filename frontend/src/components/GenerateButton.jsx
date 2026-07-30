function GenerateButton({ loading, onClick }) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="generate-btn"
        >
            {loading ? "Generating..." : "Generate Voice"}
        </button>
    );
}

export default GenerateButton;