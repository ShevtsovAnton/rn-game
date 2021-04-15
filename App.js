import React, { useState } from 'react';
import Game from './src/components/Game';

export default function App() {
  const [gameId, setGameId] = useState(1);
  const resetGame = () => {
    setGameId((prev) => prev + 1);
  };
  return (
    <Game
      key={gameId}
      resetGame={resetGame}
      randomNumberCount={6}
      initialSeconds={10}
    />
  );
}
