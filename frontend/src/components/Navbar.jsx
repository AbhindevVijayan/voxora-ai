import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    return (
        <nav className="bg-white border-b shadow-sm">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                <h1 className="text-2xl font-bold text-slate-800">
                    🎤 High Fidelity Voiceover Generator
                </h1>

                <div className="flex gap-6">
                    <Link
                        to="/"
                        className={`font-medium ${location.pathname === "/"
                            ? "text-blue-600"
                            : "text-slate-600 hover:text-blue-600"
                            }`}
                    >
                        Generate
                    </Link>

                    <Link
                        to="/history"
                        className={`font-medium ${location.pathname === "/history"
                            ? "text-blue-600"
                            : "text-slate-600 hover:text-blue-600"
                            }`}
                    >
                        History
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;