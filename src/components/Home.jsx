import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import ChatCompanion from "./ChatCompanion"; // Import chatbot script
import "./../App.css";
import brainNeuro from '../assets/brain-neuro.jpg';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // Function to open chatbot manually (in case it doesn't auto-open)
  const openChatbot = () => {
    if (window.botpressWebChat) {
      window.botpressWebChat.sendEvent({ type: "show" });
    }
  };

  // Handle scrolling to move chatbot with page
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home-page full-screen">
     {/* Include chatbot script on home page */}

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
        <div className="logo"></div>
          <span className="brand-text">NeuroVerse</span>
        </div>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/dyscalculia">Dyscalculia Support</Link></li>
          <li><Link to="/spd">SPD Support</Link></li>
          <li><Link to="/flashcardapp">ADHD Support</Link></li>
          <li><Link to="/moodtracker">Alexithymia Support</Link></li>
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <main className="hero full-screen">
            <div className="hero-content">
               <h1 className="hero-title">Unlocking Potential, One Mind at a Time</h1>
               <p className="hero-subtitle">
                 Neurodiversity is not a challenge—it's a <b>superpower.</b>  
             </p>
          <p className="hero-message">
            Whether you’re on the spectrum, living with ADHD, SPD or any neurological difference,  
            <b>you belong here.</b> We are a community that <b>celebrates, supports, and empowers </b>  
            every unique mind. Together, we break barriers and build a world of possibilities.  
          </p>
          <button className="hero-btn" onClick={() => navigate('/contact')}>Contact Us</button>
            </div>
            <div className="hero-image">
            <img src={brainNeuro} alt="Brain and Neurodiversity" />
            </div>
      </main>


      
      {/* Floating Chatbot Icon that moves with scrolling */}
      <ChatCompanion /> 

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 NeuroVerse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

