// src/App.js
import React, { useState } from 'react';
import './App.css';
import WelcomeScreen from './Components/WelcomeScreen';
import GameScreen from './Components/GameScreen';
import Title from './Components/Title';
import HistoryPage from './Components/HistoryPage'; // Asegúrate de tener este componente

function App() {
  const [name, setName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [viewHistory, setViewHistory] = useState(false);

  // Método para desordenar las respuestas
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Método para obtener preguntas del backend
  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:9000/questions');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Desordenar las respuestas de cada pregunta
      const shuffledQuestions = data.map(question => {
        const answers = shuffleArray([question.respuestaB, question.respuestaM1, question.respuestaM2]);
        return { ...question, answers };
      });
      setQuestions(shuffledQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Método para iniciar el juego
  const handleStartGame = async () => {
    if (name.trim() === '') {
      alert('Por favor, ingrese su nombre.');
      return;
    }
    await fetchQuestions();
    setGameStarted(true);
    setShowForm(false);
    setAciertos(0);
  };

  // Método para mostrar la página de historial
  const handleViewHistory = () => {
    setViewHistory(true);
  };

  // Método para manejar la respuesta del jugador
  const handleAnswer = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (option === currentQuestion.respuestaB) {
      setAciertos(aciertos + 1);
      alert('Respuesta correcta!');
    } else {
      alert('Respuesta incorrecta.');
    }
    if (currentQuestionIndex < 10) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Manejo del fin del juego
      if (aciertos >= 6) {
        alert(`Juego terminado. Aciertos: ${aciertos} ¡HAS GANADO!`);
      } else {
        alert(`Juego terminado. Aciertos: ${aciertos} ¡HAS PERDIDO!`);
      }
      handleGameEnd();
    }
  };

  // Método para guardar el historial del juego y restablecer el estado
  const handleGameEnd = async () => {
    const requestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, aciertos })
    };
    try {
      const response = await fetch('http://localhost:9000/history', requestInit);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Historial guardado exitosamente');
    } catch (error) {
      console.error('Error saving history:', error);
    }
    // Restablecer el estado al menú inicial
    setGameStarted(false);
    setShowForm(false);
    setCurrentQuestionIndex(0);
    setName('');
  };

  // Método para volver al menú principal desde la página de historial
  const handleBackToMenu = () => {
    setViewHistory(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Title />
        {!showForm && !gameStarted && !viewHistory && (
          <div className="button-group">
            <button onClick={() => setShowForm(true)}>Iniciar Partida</button>
            <button onClick={handleViewHistory}>Ver Historial</button>
          </div>
        )}
        {showForm && !gameStarted && !viewHistory && (
          <WelcomeScreen 
            name={name}
            setName={setName}
            handleStartGame={handleStartGame}
          />
        )}
        {gameStarted && questions.length > 0 && (
          <GameScreen 
            name={name}
            question={questions[currentQuestionIndex]}
            handleAnswer={handleAnswer}
          />
        )}
        {viewHistory && (
          <div>
            <HistoryPage />
            <button onClick={handleBackToMenu}>Volver al Menú Principal</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
