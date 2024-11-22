import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [position, setPosition] = useState(0); // Posizione della macchina
  const [intervalId, setIntervalId] = useState(null); // ID dell'intervallo per fermarlo

  const playElevatorMusic = () => {
    const audio = new Audio("/elevator-music.mp3");
    audio.play();
  };

  const handleMove = (gear) => {
    // Ferma il movimento attuale
    if (intervalId) {
      clearInterval(intervalId);
    }

    // Definisce la velocità in base alla marcia
    const speeds = {
      1: 5,   // Velocità lenta per la prima
      2: 10,  // Velocità media per la seconda
      3: 15,  // Velocità più veloce per la terza
      4: 20,  // Velocità massima per la quarta
      5: 8,   // Velocità ridotta per la quinta
      reverse: -10, // Retromarcia, muove verso l'alto
    };

    if (gear === 5) {
      playElevatorMusic(); // Riproduce la musica per la quinta marcia
    }

    // Imposta un nuovo movimento continuo
    const newIntervalId = setInterval(() => {
      setPosition((prev) => prev + speeds[gear]);
    }, 100); // Aggiorna la posizione ogni 100ms

    setIntervalId(newIntervalId);
  };

  // Pulisce l'intervallo quando il componente viene smontato
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="App">
      <div className="buttons">
        <button onClick={() => handleMove(1)}>Metti prima</button>
        <button onClick={() => handleMove(2)}>Metti seconda</button>
        <button onClick={() => handleMove(3)}>Metti terza</button>
        <button onClick={() => handleMove(4)}>Metti quarta</button>
        <button onClick={() => handleMove(5)}>Metti quinta</button>
        <button onClick={() => handleMove("reverse")}>
          Retromarcia parcheggio
        </button>
      </div>
      <div className="road">
        <div
          className="car"
          style={{
            transform: `translateY(${position}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          🚗
        </div>
      </div>
    </div>
  );
};

export default App;
