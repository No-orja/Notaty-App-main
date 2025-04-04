import React from 'react';
import './App.css';
import NavBar from './Coponent/NavBar';
import Home from './Coponent/Home';
import { Route, Routes } from 'react-router-dom';
import MyToDoesPage from './Coponent/MyToDoesPage';
import MyNotesPage from './Coponent/MyNotesPage';

function App() {
  return (
    <div >
      <NavBar />
      <div style={{
        backgroundColor: "#FFFFFF",
        backgroundImage: "radial-gradient(rgba(211, 47, 47, 0.3) 2px, transparent 0)",
        backgroundSize: "30px 30px"

      }}>
        <div className="containerMain">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mytodos" element={<MyToDoesPage />} />
            <Route path="/mynotes" element={<MyNotesPage />} />
          </Routes>
        </div>      
      </div>
    </div>
  );
}


export default App;
