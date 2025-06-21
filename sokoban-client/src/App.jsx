import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
