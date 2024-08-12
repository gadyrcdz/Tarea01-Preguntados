import React, { useState } from 'react';
import './App.css';
import WelcomeScreen from './Components/WelcomeScreen';
import GameScreen from './Components/GameScreen';
import Title from './Components/Title';

function App() {
  const [name, setName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [aciertos, setAciertos] = useState(0);

  //metodo para desordenar una lista con las respuestas
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  //metodo para obtener del backend las preguntas
  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:9000/questions');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const shuffledQuestions = data.map(question => {
        const answers = shuffleArray([question.respuestaB, question.respuestaM1, question.respuestaM2]);
        return { ...question, answers };
      });
      setQuestions(shuffledQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  //metodo para iniciar con el apartado de juego
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

  const handleViewHistory = () => {
    // Aquí puedes redirigir a la página de historial de resultados
  };

  //metodo que controla el fin de la partida como tambien en de las respuestas
  const handleAnswer = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (option === currentQuestion.respuestaB) {
      setAciertos(aciertos + 1);
      alert('Respuesta correcta!');
    } else {
      alert('Respuesta incorrecta.');
    }
    if (currentQuestionIndex < 10-1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if(aciertos>=6){
        alert(`Juego terminado. Aciertos: ${aciertos} HAZ GANADO!`);
      }
      else{
        alert(`Juego terminado. Aciertos: ${aciertos} HAZ PERDIDO!`);

      }
      
      handleGameEnd();
    }
  };

  // metodo para restablecer al menu inicial luego de terminar la partida
  const handleGameEnd = async () => {
    //metodo para guardar los datos en la BD de historial
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
    setGameStarted(false);
    setShowForm(false);
    setCurrentQuestionIndex(0);
    setName('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <Title />
        {!showForm && !gameStarted && (
          <div className="button-group">
            <button onClick={() => setShowForm(true)}>Iniciar Partida</button>
            <button onClick={handleViewHistory}>Ver Historial</button>
          </div>
        )}
        {showForm && !gameStarted && (
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
      </header>
    </div>
  );
}

export default App;
