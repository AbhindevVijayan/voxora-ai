import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h2>High Fidelity Voiceover Generator</h2>

            <Link to="/">Generate</Link>{" "}
            <Link to="/history">History</Link>
        </nav>
    );
}

export default Navbar;