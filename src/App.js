import React from "react";

import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/BookState";
import Alert from "./component/Alert";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { useState } from "react";

export default function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) =>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert = {alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />

            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}





