import "@fortawesome/fontawesome-free/css/all.min.css";
import WeatherDashboard from "./components/WeatherDashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StartPage from "./components/StartPage";
import { useState, useEffect } from "react";


function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState();

  // JSON.parse(localStorage.getItem("darkMode")) || false
  // Load user's preference from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem("darkMode");
    if (savedPreference !== null) {
      try {
        setIsDarkMode(JSON.parse(savedPreference));
      } catch (error) {
        console.error("Error parsing dark mode preference:", error);
      }
    } else {
      setIsDarkMode(true);
    }
  }, []);

  // Update localStorage whenever isDarkMode changes
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Toggle dark and white mode
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    if (localStorage.getItem("visited")) {
      const visited = localStorage.getItem("visited");
      setIsFirstVisit(!visited);
    }
  }, []);

  const handleGetStarted = () => {
    localStorage.setItem("visited", "true");
  };

  return (
    <Router>
      <Routes>
        {/* Show StartPage only if it is the first visit */}
        <Route
          path="/"
          element={
            isFirstVisit ? (
              <StartPage
                onGetStarted={handleGetStarted}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/home/*"  // Allow nested routes under /home
          element={
            <WeatherDashboard
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          }
        />
      
      </Routes>
    </Router>
  );
}

export default App;
