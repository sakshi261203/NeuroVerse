import React from "react";
import "../styles.css";

const emotions = [
  { name: "Happy", emoji: "😊" },
  { name: "Sad", emoji: "😢" },
  { name: "Angry", emoji: "😡" },
  { name: "Anxious", emoji: "😰" },
  { name: "Excited", emoji: "🤩" },
  { name: "Calm", emoji: "😌" },
];

const EmotionWheel = ({ onSelectEmotion }) => {
  return (
    <div className="emotion-wheel">
      {emotions.map((emotion, index) => (
        <div key={index} className="emotion-item">
          <button
            className="emotion-button"
            onClick={() => onSelectEmotion(emotion.name)}
          >
            {emotion.emoji}
          </button>
          <span>{emotion.name}</span>
        </div>
      ))}
    </div>
  );
};

export default EmotionWheel;