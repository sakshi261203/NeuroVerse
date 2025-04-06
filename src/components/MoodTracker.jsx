import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "../styles.css";

Chart.register(...registerables);

const emotions = [
  { name: "Happy", emoji: "😊", color: "#FFD700" }, // Gold
  { name: "Sad", emoji: "😢", color: "#3498db" }, // Blue
  { name: "Angry", emoji: "😡", color: "#e74c3c" }, // Red
  { name: "Anxious", emoji: "😰", color: "#8e44ad" }, // Purple
  { name: "Excited", emoji: "🤩", color: "#FF6347" }, // Tomato
  { name: "Calm", emoji: "😌", color: "#2ecc71" }, // Green
];

const EmotionWheel = ({ onSelectEmotion }) => {
  return (
    <div className="emotion-wheel">
      {emotions.map((emotion, index) => (
        <div key={index} className="emotion-item">
          <button
            className="emotion-button"
            onClick={() => onSelectEmotion(emotion.name, emotion.color)}
          >
            {emotion.emoji}
          </button>
          <span>{emotion.name}</span>
        </div>
      ))}
    </div>
  );
};

const MoodTracker = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#ff9a9e"); // Default gradient
  const [moodFrequency, setMoodFrequency] = useState({});

  const addMood = () => {
    if (selectedEmotion) {
      setMoodFrequency((prev) => ({
        ...prev,
        [selectedEmotion]: (prev[selectedEmotion] || 0) + 1,
      }));
    }
  };

  const clearGraphData = () => {
    setMoodFrequency({});
  };

  const pastelColors = [
    "rgba(255, 179, 186, 0.6)", // Light Pink
    "rgba(255, 223, 186, 0.6)", // Peach
    "rgba(255, 255, 186, 0.6)", // Soft Yellow
    "rgba(186, 255, 201, 0.6)", // Light Green
    "rgba(186, 225, 255, 0.6)", // Light Blue
    "rgba(220, 198, 255, 0.6)", // Lavender
  ];

  const data = {
    labels: Object.keys(moodFrequency),
    datasets: [
      {
        label: "Mood Frequency",
        data: Object.values(moodFrequency),
        backgroundColor: pastelColors.slice(0, Object.keys(moodFrequency).length),
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mood-tracker-container" style={{ background: `linear-gradient(135deg, ${selectedColor}, #fad0c4)` }}>
      {/* ✅ EmotionWheel on top */}
     
      <EmotionWheel
        onSelectEmotion={(emotion, color) => {
          setSelectedEmotion(emotion);
          setSelectedColor(color);
        }}
      />

      {/* ✅ Mood Tracker below */}
      <div className="mood-tracker">
        <h2>Alexithymia Support</h2>
        {selectedEmotion && <p>Current Mood: <strong>{selectedEmotion}</strong></p>}
        <button onClick={addMood} className="track-button">Save Mood</button>
        <button onClick={clearGraphData} className="clear-button">Clear Graph Data</button>

        <div className="chart-container">
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
