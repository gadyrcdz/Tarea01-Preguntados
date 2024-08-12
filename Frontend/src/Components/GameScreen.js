import React from 'react';

//html que muestra las preguntas
const GameScreen = ({ name, question, handleAnswer }) => {
  return (
    <div className="game-screen">
      <h2>{name},</h2>
      <h3>{question.pregunta}</h3>
      <div className="answers">
        {question.answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswer(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameScreen;