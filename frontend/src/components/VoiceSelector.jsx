function VoiceSelector({ voices, value, onChange }) {
    return (
        <div>
            <label>Select Voice</label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Choose a voice</option>

                {voices.map((voice) => (
                    <option
                        key={voice.voice_id}
                        value={voice.voice_id}
                    >
                        {voice.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default VoiceSelector;