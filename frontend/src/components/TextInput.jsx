function TextInput({ value, onChange }) {
    return (
        <div>
            <label>Enter Text</label>

            <textarea
                rows="8"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type something..."
            />
        </div>
    );
}

export default TextInput;