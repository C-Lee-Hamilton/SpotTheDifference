import "./App.css";
import PictureBox from "./components/picturebox";
import { useState, useEffect } from "react";
function App() {
  return (
    <div className="App">
      <h1 className="header">Spot The Difference</h1>
      <PictureBox />
    </div>
  );
}

export default App;
