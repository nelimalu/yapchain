import { useState } from 'react'
import Login from './pages/login'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hi from './pages/hi'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}>
              <Route path="/hi" element={<Hi />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
