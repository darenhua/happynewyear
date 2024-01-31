import { useEffect, useState } from "react";
export default function useDarkMode() {
    // lazy initialization -- isDarkMode is initialized once
    // isDarkMode: true | false
    const [isDarkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        return (
            savedMode === "true" ||
            (!("darkMode" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        );
    });

    useEffect(() => {
        localStorage.setItem("darkMode", isDarkMode);
        document.body.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return { isDarkMode, toggleDarkMode };
}
