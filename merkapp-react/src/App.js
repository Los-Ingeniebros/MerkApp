import React from 'react';
import './App.css';

const displayEmojiName = event => alert(event.target.id);
const emojis = [
  {
  emoji: "😀",
  name: "grinning face"
  },
  {
  emoji: "🎉",
  name: "party popper"
  },
  {
  emoji: "💃",
  name: "woman dancing"
  }
  ];
  
function App() {
  const greeting = "greeting";
  return (
  <div className='container'>
    <h1 id={greeting}>Hola, mamon</h1>
    <p>Esto es un ejemplo de como escribir las cosas en React</p>
    <ul>
      <li>
        <button onClick={displayEmojiName}>
          <span role="img" aria-label="grinning face" id="grinning face"/>
          a
        </button>
      </li>
      <li>
      <button onClick={displayEmojiName}>
      <span role="img" aria-label="party popper" id="party popper" />
      b
      </button>
      </li>
      <li>
      <button onClick={displayEmojiName}>
      <span role="img" aria-label="woman dancing" id="woman dancing" />
      c
      </button>
      </li>
    </ul>
  </div>

)
}

export default App;
