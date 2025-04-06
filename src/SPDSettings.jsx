import React, { useState, useEffect } from "react";
import "./SPDSettings.css";
import { Link } from "react-router-dom";
const SPDSettings = () => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [fontSharpness, setFontSharpness] = useState(1);
  const [theme, setTheme] = useState("default");
  const [soundMuted, setSoundMuted] = useState(false);
  const [gentleTransitions, setGentleTransitions] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply brightness, contrast, and font sharpness globally
    root.style.setProperty("--brightness", brightness /130);
    root.style.setProperty("--contrast", contrast / 130);
    root.style.setProperty("--font-sharpness", fontSharpness);
    root.style.transition = gentleTransitions ? "all 0.5s ease-in-out" : "none";
  }, [brightness, contrast, fontSharpness, gentleTransitions]);

  useEffect(() => {
    const root = document.documentElement;

    // Apply Theme Globally to the Whole Page
    if (theme === "dark") {
      root.style.setProperty("--background-color", "#121212");  // Dark mode background
      root.style.setProperty("--text-color", "#ffffff");  // Light text for contrast
      root.style.setProperty("--container-background", "#1e1e1e"); // Dark mode container
    } else if (theme === "sepia") {
      root.style.setProperty("--background-color", "#f4e4c1");  // Sepia mode background
      root.style.setProperty("--text-color", "#5b4636");  // Dark brown text for contrast
      root.style.setProperty("--container-background", "#e8d5b7"); // Sepia mode container
    } else {
      root.style.setProperty("--background-color", "#ffffff");  // Default white background
      root.style.setProperty("--text-color", "#333333");  // Default dark text
      root.style.setProperty("--container-background", "#fff"); // Default container background
    }
  }, [theme]);

  // Mute all audio and video elements globally
  useEffect(() => {
    document.querySelectorAll("video, audio").forEach((media) => {
      media.muted = soundMuted;
    });
  }, [soundMuted]);

  return (
    <div className="spd-container">
     
      <h2>🔧 Sensory Processing Disorder (SPD) Support</h2>

      <label>Brightness</label>
      <input type="range" min="50" max="150" value={brightness} onChange={(e) => setBrightness(e.target.value)} />

      <label>Contrast</label>
      <input type="range" min="50" max="150" value={contrast} onChange={(e) => setContrast(e.target.value)} />

      <label>Font Sharpness</label>
      <input type="range" min="0.5" max="2" step="0.1" value={fontSharpness} onChange={(e) => setFontSharpness(e.target.value)} />

      <label>Theme</label>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="default">Default</option>
        <option value="dark">Dark Mode</option>
        <option value="sepia">Sepia</option>
      </select>

      <label>Sound Muting</label>
      <input type="checkbox" checked={soundMuted} onChange={() => setSoundMuted(!soundMuted)} />

      <label>Gentle Transitions</label>
      <input type="checkbox" checked={gentleTransitions} onChange={() => setGentleTransitions(!gentleTransitions)} />
    </div>
  );
};

export default SPDSettings;




