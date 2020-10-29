import React from 'react';
import Header from './Components/Header.js';
import Pomodoro from './Components/Pomodoro.js';
import './app.css';

function App() {
  return (
    <div className="app">
        <Header />
        <Pomodoro />
    </div>
  );
}

export default App;
