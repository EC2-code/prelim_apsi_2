import React, { useState } from 'react';
import "./Game.css";
import Chicken from "./asset/chicken.jpg";
import Banana from "./asset/banana.jpg";

function shuffleBoard() {
  const chickenTiles = Array(18).fill({ type: "chicken", img: Chicken });
  const bananaTiles = Array(18).fill({ type: "banana", img: Banana });
  const allTiles = [...chickenTiles, ...bananaTiles];

  for (let i = allTiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allTiles[i], allTiles[j]] = [allTiles[j], allTiles[i]];
  }
  return allTiles;
}

function GameApp() {
  const [images, setImages] = useState(shuffleBoard());
  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [scores, setScores] = useState({ chicken: 0, banana: 0 });

  const [chickenCount, setChickenCount] = useState(0);
  const [bananaCount, setBananaCount] = useState(0);

  const [playerChoice, setPlayerChoice] = useState(null);
  const [colorGrid, setColorGrid] = useState(false);

  const chickenLeft = images.filter((tile, i) => tile.type === 'chicken' && !revealed[i]).length;
  const bananaLeft = images.filter((tile, i) => tile.type === 'banana' && !revealed[i]).length;

  function chooseType(type) {
    if (playerChoice) return;
    setPlayerChoice(type);
    setColorGrid(true);
  }

  function tileClick(index) {
    if (gameOver || revealed[index] || !playerChoice) return;

    const updatedRevealed = [...revealed];
    updatedRevealed[index] = true;
    setRevealed(updatedRevealed);

    const clickedType = images[index].type;

    if (clickedType === playerChoice) {
      if (playerChoice === "chicken") {
        setChickenCount(prev => {
          const newCount = prev + 1;
          if (newCount === 18) {
            setGameOver(true);
            setWinner('Chicken Player');
            setScores(prev => ({ ...prev, chicken: prev.chicken + 1 }));
            setRevealed(Array(36).fill(true));
          }
          return newCount;
        });
      } else {
        setBananaCount(prev => {
          const newCount = prev + 1;
          if (newCount === 18) {
            setGameOver(true);
            setWinner('Banana Player');
            setScores(prev => ({ ...prev, banana: prev.banana + 1 }));
            setRevealed(Array(36).fill(true));
          }
          return newCount;
        });
      }
    } else {
      setGameOver(true);
      const winningPlayer = playerChoice === "chicken" ? "Banana Player" : "Chicken Player";
      setWinner(`${winningPlayer}`);
      setScores(prev =>
        playerChoice === "chicken"
          ? { ...prev, banana: prev.banana + 1 }
          : { ...prev, chicken: prev.chicken + 1 }
      );
      setRevealed(Array(36).fill(true));
    }
  }
  function restartGame() {
    setImages(shuffleBoard());
    setRevealed(Array(36).fill(false));
    setGameOver(false);
    setWinner('');
    setPlayerChoice(null);
    setChickenCount(0);
    setBananaCount(0);
    setColorGrid(false);
  }

  return (
    <div className="Container">
      <div className="header">
        <h1>
          <span className="chicken-header">Chicken</span>
          <span className="banana-header">Banana</span>
        </h1>
        <div>
          <b>Score:</b>
          <span> Chicken: {scores.chicken}</span>
          <span> | </span>
          <span> Banana: {scores.banana}</span>
        </div>

        {!playerChoice && (
          <p>
            Choose your side:
            <button className="c-btn" onClick={() => chooseType("chicken")}>I'm Chicken</button>
            <button className="b-btn" onClick={() => chooseType("banana")}>I'm Banana</button>
          </p>
        )}

        {playerChoice && !gameOver && (
          <p>
            You are: <b>{playerChoice.toUpperCase()} Player</b><br />
            Click only the <b>{playerChoice}</b> tiles!
          </p>
        )}

        {gameOver && (
          <p className="winner">
            {winner} wins!
          </p>
        )}
      </div>

      <div className="grid">
        {images.map((tile, idx) => {
          const isFlipped = revealed[idx];
          return (
            <button
              key={idx}
              className="square"
              onClick={() => tileClick(idx)}
              disabled={isFlipped || gameOver}
            >
              <div className={`card-inner ${isFlipped ? "flip" : ""}`}>
                <div className="card-front" style={{ backgroundColor: colorGrid ? '#ffcd80' : 'grey' }}>{idx + 1}</div>
                <div className="card-back">
                  <img className="imgSquare" src={tile.img} alt={tile.type} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {gameOver && (<button className="restart" onClick={restartGame}>Restart Game</button>)}
    </div>
  );
}

export default GameApp;
