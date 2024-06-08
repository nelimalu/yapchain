import { useState } from 'react'
import Login from './pages/login'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hi from './pages/hi'
import Chat from './pages/chat'
import Layout from './pages/layout'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="/hi" index element={<Login />} />
            <Route path="/hi" element={<Hi />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
