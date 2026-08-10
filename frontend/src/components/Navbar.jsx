import { NavLink } from "react-router-dom";
import { Mic2, Sparkles, History } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

                {/* Logo */}

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg">

                        <Mic2 size={24} />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
                            Voxora <span className="text-indigo-600">AI</span>
                        </h1>

                        <p className="text-xs text-slate-500 text-slate-500 dark:text-white">
                            Intelligent Voice Generation
                        </p>

                    </div>

                </div>

                {/* Navigation */}

                <nav className="flex items-center gap-3">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-200
                            ${isActive
                                ? "bg-indigo-600 text-white shadow-md"
                                : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                            }`
                        }
                    >
                        <Sparkles size={18} />
                        Generate
                    </NavLink>

                    <NavLink
                        to="/history"
                        className={({ isActive }) =>
                            `flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-200
                            ${isActive
                                ? "bg-indigo-600 text-white shadow-md"
                                : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                            }`
                        }
                    >
                        <History size={18} />
                        History
                    </NavLink>
                    <ThemeToggle />
                </nav>

            </div>
        </header>
    );
}

export default Navbar;