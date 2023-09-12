
import React, { useState, useEffect } from "react";
import "./App.css";
import WebPage from "./vision/WebPage";
import Android from "./vision/Android";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [dimension, setDimension] = useState(window.innerWidth);

  useEffect(() => {
    const checkDimension = () => {
      setDimension(window.innerWidth);
    };

    window.addEventListener("resize", checkDimension);

    return () => {
      window.removeEventListener("resize", checkDimension);
    };
  }, []);

  return (
    <div className="App">
      {/* Add the 'basename' prop to BrowserRouter */}
      <BrowserRouter basename="/notes-app">
        <Routes>
          {dimension > 500 ? (
            <Route path="/" element={<WebPage />} />
          ) : (
            <Route path="/" element={<Android />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

