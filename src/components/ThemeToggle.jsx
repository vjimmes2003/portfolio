import React, { useEffect, useState } from "react";
import "../index.css";
import "../App.css";

const THEMES = [
  { name: "dark", icon: "🌑", label: "Oscuro" },
  { name: "minecraft", icon: "🟩", label: "Minecraft" },
  { name: "discord", icon: "🔵", label: "Discord" },
  { name: "cyberpunk", icon: "🌆", label: "Cyberpunk" },
  { name: "scifi", icon: "👾", label: "Sci-fi" },
  { name: "fantasy", icon: "🧝‍♂️", label: "Fantasia" },
  { name: "light", icon: "☀️", label: "Claro" },
];

function ThemeToggle() {
  const [index, setIndex] = useState(() => {
    const stored = localStorage.getItem("theme");
    const i = THEMES.findIndex((t) => t.name === stored);
    return i !== -1 ? i : 0;
  });

  useEffect(() => {
    const themeName = THEMES[index].name;
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
  }, [index]);

  const nextTheme = () => setIndex((prev) => (prev + 1) % THEMES.length);

  return (
    <button
      className="theme-toggle"
      onClick={nextTheme}
      title={`Tema actual: ${THEMES[index].label}`}
    >
      {THEMES[index].icon}
    </button>
  );
}

export default ThemeToggle;
