// src/Components/HistoryPage.js
import React, { useState, useEffect } from 'react';

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:9000/historial');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Historial de Resultados</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre, </th>
            <th> Aciertos</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.aciertos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
