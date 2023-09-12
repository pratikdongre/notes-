// import { useState, useEffect } from "react";
// import "./App.css";
// import WebPage from "./vision/WebPage";
// import Android from "./vision/Android";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// function App() {
//   const [dimension, setDimension] = useState(window.innerWidth);
//   const [selected, setSelected] = useState("");
//   // const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     setSelected(localStorage.getItem("selected") || "");
//   }, [selected]);

//   const checkDimension = () => {
//     setDimension(window.innerWidth);
//   };

//   window.addEventListener("resize", checkDimension);

//   return (
//     <div className="App">
//       {dimension > 500 ? (
//         <WebPage />
//       ) : (
//         <BrowserRouter>
//           <Routes>
//             <Route
//               path="/"
//               element={<Android selected={selected} setSelected={setSelected} />}
//             />
//           </Routes>
//         </BrowserRouter>
//       )}
//     </div>
//   );
// }

// export default App;






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
      <BrowserRouter>
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

