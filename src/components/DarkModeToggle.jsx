import React, { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
    if (saved === "light") setDark(false);
  }, []);

  return (
    <button
      className="fixed top-4 right-4 z-50 bg-gradient-to-r from-blue-500 to-teal-400 text-white p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition flex items-center justify-center"
      onClick={() => setDark(d => !d)}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        <span className="material-icons text-yellow-300 text-2xl">light_mode</span>
      ) : (
        <span className="material-icons text-gray-100 text-2xl">dark_mode</span>
      )}
    </button>
  );
} 