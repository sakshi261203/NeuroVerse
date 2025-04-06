import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dyscalculia from "./Dyscalculia";
import SPDSettings from "./SPDSettings";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import FlashcardApp from "./FlashcardApp";
import ChatCompanion from "./components/ChatCompanion";
import MoodTracker from "./components/MoodTracker";
import Contact from "./Contact"
const Layout = () => {
  const location = useLocation(); // Get current page route

  // Hide chatbot on Dyscalculia page
  const showChatbot = location.pathname !== "/dyscalculia";

  return (
    <>
      {showChatbot && <ChatCompanion />} {/* Conditionally render chatbot */}
      <Routes>
        <Route path="/dyscalculia" element={<Dyscalculia />} />
        <Route path="/spd" element={<SPDSettings />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/flashcardapp" element={<FlashcardApp />} />
        <Route path="/moodtracker" element={<MoodTracker />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;

