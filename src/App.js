import './App.css';
import {useState} from "react";
import GameApp from './Game';

function Counter(){
  const [count, setCount] = useState(0);
  
  function handleClick(){
    setCount(count + 1);
  }

  return(
    <div className="textbox">
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
    <div>
      <div className="textbox">
        <Welcome name="Medell Emmanuel"/>
        <Welcome name="Remolacio"/>
        <Welcome name="Castro"/>
      </div>
      <div>
        <Counter/>
      </div>
      <div className="btnbox">
        <button type="button" onClick={GoToGame}>Play</button>
      </div>
    </div>
  )
}

export default App;
