import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home/Home'
import Game from './pages/Home/Game/Game'
import Details from './pages/Home/Details/Details'
import Header from './components/Header/Header'
import { ModalContextProvider } from './contexts/ModalContext'


const Router = () => {
  return (
<BrowserRouter>
      <ModalContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/game-on" element={<Game />} />
        </Routes>
      </ModalContextProvider>
    </BrowserRouter>
  );
}

export default Router