function VoiceSelector({ voices, value, onChange }) {
    return (
        <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select Voice
            </label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            >
                <option value="">Choose a voice</option>

                {voices.map((voice) => (
                    <option key={voice.voice_id} value={voice.voice_id}>
                        {voice.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default VoiceSelector;