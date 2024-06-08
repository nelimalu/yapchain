import { useState } from 'react'
import Login from './pages/login'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hi from './pages/hi'
import Chat from './pages/chat'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/hi" element={<Hi />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
