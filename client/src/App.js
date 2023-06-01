import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from "./Chat";
import Login from './Login';
import { Routes, Route } from "react-router-dom";
const { io } = require("socket.io-client");
const socket = io("ws://localhost:5000");

function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Login socket={socket}/>} />
        <Route path="/chat" element={<Chat socket={socket}/>} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
    

  );
}


export default App;
