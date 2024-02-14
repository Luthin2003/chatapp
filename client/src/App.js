import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./screens/Join/Join.js";
import Chat from "./screens/Chat/Chat.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
