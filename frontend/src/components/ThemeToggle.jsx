import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
    const { dark, toggleTheme } = useTheme();

    return (
        <button
            onClick={() => {
                console.log("Clicked");
                toggleTheme();
            }}
            className="rounded-xl border border-slate-300 p-2"
        >
            {dark ? (
                <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
                <Moon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
            )}
        </button>
    );
}

export default ThemeToggle;