import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import "./FlashcardApp.css";

function FlashcardApp() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(5); // in minutes
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionElapsed, setSessionElapsed] = useState(0); // elapsed seconds
  const [sessionFullyCompleted, setSessionFullyCompleted] = useState(false);
  const [autoNext, setAutoNext] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState("");
  const [quote, setQuote] = useState("");

  // Native Web Speech API
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const synthVoices = window.speechSynthesis.getVoices();
      setVoices(synthVoices);
      if (synthVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(synthVoices[0]);
      }
    };
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, [selectedVoice]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    window.speechSynthesis.speak(utterance);
  };

  const handleTextUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const generateFlashcards = () => {
    const paragraphs = text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const flashcardChunks = [];

    paragraphs.forEach((paragraph) => {
      if (paragraph.length > 300) {
        const sentences = paragraph.split(/(?<=\.\s)/);
        let chunk = "";
        sentences.forEach((sentence) => {
          if (chunk.length + sentence.length < 300) {
            chunk += sentence;
          } else {
            flashcardChunks.push(chunk.trim());
            chunk = sentence;
          }
        });
        if (chunk) {
          flashcardChunks.push(chunk.trim());
        }
      } else {
        flashcardChunks.push(paragraph);
      }
    });

    setFlashcards(flashcardChunks);
    setIndex(0);
  };

  const fetchMotivationalQuote = async () => {
    try {
      const response = await fetch("/quotes.json");
      const quotes = await response.json();
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex].quote);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setQuote("You're doing great! Keep pushing forward.");
    }
  };

  const startSession = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
    setSessionActive(true);
    setSessionElapsed(0);
    setSessionFullyCompleted(false);
  };

  const endSession = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setSessionActive(false);

    if (sessionElapsed >= sessionDuration * 60) {
      setSessionFullyCompleted(true);
      awardBadge();
    }
  };

  const awardBadge = () => {
    const badges = [
      "Focused Learner 🏅",
      "Session Master 🏆",
      "Flashcard Pro 🚀",
      "Champion of Focus 🎖️"
    ];
    const randomBadge = badges[Math.floor(Math.random() * badges.length)];
    setEarnedBadge(randomBadge);
  };

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % flashcards.length);
  };

  const goToPrev = () => {
    setIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  useEffect(() => {
    let intervalId;
    if (sessionActive) {
      const totalSeconds = sessionDuration * 60;
      intervalId = setInterval(() => {
        setSessionElapsed((prev) => {
          if (prev < totalSeconds) {
            return prev + 1;
          } else {
            clearInterval(intervalId);
            return prev;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [sessionActive, sessionDuration]);

  return (
    <div className="container">
      {sessionFullyCompleted && <Confetti />}

      {!sessionActive ? (
        <div className="setup-container">
          <h1 className="title1">Neurodivergent Flashcards</h1>
          {sessionFullyCompleted && earnedBadge && (
            <p className="badge">🏅 You earned: {earnedBadge}</p>
          )}
          <div className="upload-container">
            <label htmlFor="fileUpload" className="custom-file-label">
              Choose File
            </label>
            <input
              type="file"
              id="fileUpload"
              accept=".txt"
              onChange={handleTextUpload}
              className="file-input"
            />
            <textarea
              className="text-input"
              rows="4"
              placeholder="Or paste text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="timer-container">
            <label htmlFor="session-duration">
              Set Session Duration (minutes):
            </label>
            <input
              type="number"
              id="session-duration"
              value={sessionDuration}
              min="1"
              onChange={(e) =>
                setSessionDuration(parseInt(e.target.value, 10))
              }
            />
          </div>
          <button className="btn generate-btn" onClick={generateFlashcards}>
            Generate Flashcards
          </button>
          {flashcards.length > 0 && (
            <button className="btn start-btn" onClick={startSession}>
              Start Session
            </button>
          )}
        </div>
      ) : (
        <div className="session-container">
          <div className="session-header">
            <h2>
              Flashcard Session ({sessionDuration} min)
            </h2>
            <button className="btn end-btn" onClick={endSession}>
              End Session
            </button>
          </div>
          <div className="session-progress-bar-container">
            <div
              className="session-progress-bar"
              style={{
                width: `${(sessionElapsed / (sessionDuration * 60)) * 100}%`
              }}
            ></div>
          </div>
          <div className="flashcard-container">
            <progress
              className="progress-bar"
              value={((index + 1) / flashcards.length) * 100}
              max="100"
            />
            <div className="flashcard-box">
              <motion.p
                className="flashcard-text active"
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {flashcards[index]}
              </motion.p>
            </div>
            <div className="navigation-buttons">
              <button className="btn nav-btn" onClick={goToPrev} disabled={index === 0}>
                ⬅️ Previous
              </button>
              <button className="btn nav-btn" onClick={goToNext} disabled={index === flashcards.length - 1}>
                Next ➡️
              </button>
            </div>
            <div className="card-buttons">
              <button className="btn speech-btn" onClick={() => speak(flashcards[index])}>
                🔊 Read Aloud
              </button>
              <button className="btn motivation-btn" onClick={fetchMotivationalQuote}>
                You're doing great!
              </button>
            </div>
            <div className="voice-selector">
              <label htmlFor="voiceSelect">Choose a voice:</label>
              <select
                id="voiceSelect"
                value={selectedVoice ? selectedVoice.name : ""}
                onChange={(e) => {
                  const voice = voices.find((v) => v.name === e.target.value);
                  setSelectedVoice(voice);
                }}
              >
                {voices.map((voice, index) => (
                  <option key={index} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
            {quote && <p className="motivational-quote">{quote}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashcardApp;
