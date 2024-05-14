import React from 'react';
import './App.css';
import LogInForm from '../Login/Login';

import logo from '../../imagenes/MerkAppSinFondo.png';

// const displayEmojiName = event => alert(event.target.id);
// const emojis = [
//   {
//   emoji: "😀",
//   name: "grinning face"
//   },
//   {
//   emoji: "🎉",
//   name: "party popper"
//   },
//   {
//   emoji: "💃",
//   name: "woman dancing"
//   }
//   ];

function App() {

  // const greeting = "greeting";

  async function ingresar (name) {
    console.log(name);
    const response = await fetch('http://127.0.0.1:5000/login', {
      method:'POST',
      body: JSON.stringify(name),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    if (data.error !== undefined) {
      alert("ERROR! " + data.error);
    } else {
      alert("Usuario encontrado!");
    }
  }

  return (
  <div className='login'>
    <div className="area" >
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className='container'>
        {/* <h1 id={greeting}>Hola, mamon</h1> */}
        {/* 
        <p>Esto es un ejemplo de como escribir las cosas en React</p>
        <ul>
          {
            emojis.map(emoji => (

              <li key={emoji.name}>
              
              <button
              
              onClick={displayEmojiName} 
              >
              
              <span role="img" aria-label={emoji.name} id={emoji.name}>{emoji.emoji}</span>
              
              </button>
              
              </li>
              
              ))
          }
        </ul> */}
        <header className="App-header" id="app-header">
          <span className="logo-log">
            <img src={logo} alt="MerkApp's logo"/>
            <h1>MerkApp</h1>
            <LogInForm onSaveName={ingresar}/>
          </span>
        </header>
      </div>
    </div >
  </div>
)
}

export default App;
