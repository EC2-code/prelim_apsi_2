import './App.css';
import {useState} from "react";
import GameApp from './Game';
import logo from './asset/logo.jpg'

function Counter(){
  const [count, setCount] = useState(0);
  
  function handleClick(){
    setCount(count + 1);
  }

  return(
    <div className="counterbox">
      <p>You clicked {count} times.</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
function Welcome(props){
    return <h2>Welcome, {props.name}!</h2>;
}
function App(){
  const [goTo, setGoTo] = useState(false);
  const GoToGame = (val) => {
    setGoTo(true)
  };

  if(goTo){
    return <GameApp/>;
  };

  return(
    <div className='body'>
      <div className="textbox">
        <Welcome name="Medell Emmanuel"/>
        <Welcome name="Remolacio"/>
        <Welcome name="Castro"/>
      </div>
      <div className="counterbox2">
        <Counter/>
      </div>
      <div className="btnbox">
        <button type="button" onClick={GoToGame}><img src={logo} alt="logo"></img> </button>
      </div>
    </div>
  )
}

export default App;
