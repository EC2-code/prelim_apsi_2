import React, { useState } from 'react';
import "./Game.css"
import Chicken from "./asset/chicken.jpg"
import Banana from "./asset/banana.jpg"

function Board(){
  const images = Array(18).fill({type: "chicken", img: Chicken})
  .concat(Array(18).fill({type: "banana", img: Banana}));

  for(let i = images.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  return images;
}

function GameApp() {
  const [images, setImages] = useState(Board());
  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [player, setPlayer] = useState("chicken");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [scores, setScores] = useState({chicken: 0, banana: 0})
  

  const chickenLeft = images.filter((tile, i) => tile.type === 'chicken' && !revealed[i]).length;
  const bananaLeft = images.filter((tile, i) => tile.type === 'banana' && !revealed[i]).length;

  function tileClick(click){
    if (gameOver || revealed[click]) return;
    const updatedRevealed = [...revealed];
    updatedRevealed[click] = true;
    setRevealed(updatedRevealed);

    if (images[click].type === player){
      const updatedRevealed = [...revealed];
      updatedRevealed[click] = true;
      setRevealed(updatedRevealed);

      if (player === 'chicken' && chickenLeft === 1){
        setGameOver(true);
        setWinner('Chicken Player');
        setScores(prev => ({...prev, chicken: prev.chicken + 1}));
      } else if(player === 'banana' && bananaLeft === 1){
        setGameOver(true);
        setWinner('Banana Player')
        setScores(prev => ({...prev, banana: prev.banana + 1}));
      } else{
        setPlayer(player === "chicken" ? "banana" : "chicken");
      }
    } else {
      setGameOver(true);
      const winPlayer = player === 'chicken' ? 'Banana Player' : 'Chicken Player';
      setWinner(winPlayer);
      setScores(prev =>
        player === 'chicken'
        ? {...prev, banana: prev.banana + 1}
        : {...prev, chicken: prev.chicken + 1}
      );
    }
  }

  function restart(){
    setImages(Board());
    setRevealed(Array(36).fill(false));
    setGameOver(false);
    setWinner('');
    setPlayer('chicken');
  }


  return (
    <div className='Container'>
        <div className='header'>
            <h1>
                <span className = "chicken-header" > Chicken</span>
                <span className='banana-header'>Banana</span>
            </h1>
            <div>
                <b>Score:</b>
                <span> Chicken: {scores.chicken}</span>
                <span> | </span>
                <span> Banana: {scores.banana}</span>
            </div>
            <p>
                Two players: <b>Chicken</b> and <b>Banana</b>.<br />
                {gameOver
                ? <span className='winner'>{winner} wins!</span>
                : <>Current turn: <b>{player.charAt(0).toUpperCase() + player.slice(1)} Player</b></>
                }
            </p>
        </div>
        <div className='grid'>
            {images.map((tile, idx) => (
            <button
                key={idx}
                className="square"
                style={{
                    background: revealed[idx] ? '#f0f0f0' : '#ffcd80',
                    cursor: gameOver || revealed[idx] ? 'not-allowed' : 'pointer',
                }}
                onClick={() => tileClick(idx)}
                disabled={gameOver || revealed[idx]}
            >
                {revealed[idx] ? (
                <img
                className='imgSquare'
                src={tile.img}
                alt={tile.type}
                />
                ) : (
                <span style={{ fontSize: 18 }}>{idx + 1}</span>
                )}
            </button>
            ))}
        </div>
        <button className = 'restart' onClick={restart}>Restart Game</button>
    </div>
  );
}

export default GameApp;