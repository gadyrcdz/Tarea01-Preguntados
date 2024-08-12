// src/WelcomeScreen.js
import React from 'react';


//html que contiene la bienvenida al programa
function WelcomeScreen({ name, setName, handleStartGame }) {
  return (
    <div className="form-group">
      <label htmlFor="name">Ingrese su nombre:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleStartGame}>Comenzar Juego</button>
    </div>
  );
}

export default WelcomeScreen;
