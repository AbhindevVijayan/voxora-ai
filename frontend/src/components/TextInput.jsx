function TextInput({ value, onChange }) {
    return (
        <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
                Enter Text
            </label>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={6}
                placeholder="Type something..."
                className="w-full rounded-lg border border-slate-300 p-4 text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
            />
        </div>
    );
}

export default TextInput;