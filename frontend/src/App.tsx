import '@fontsource/hammersmith-one';
import './App.css';
import { useState } from 'react';

const subscribe_shirt_fan = async (email: string, colour: string) => {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/subscribe`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        colour: colour
      }),
      headers: {'Content-Type': 'application/json'}
    })
    alert('thanks, a shirt is on the way');
  } catch (e) {
    console.error('oh no!! ' + e);
  }
};

const check_colour = async (email: string) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/colour?` + new URLSearchParams(
    {
      email: email
    }
  )
  const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }
  )
  if (response.status === 200) {
    const color = await response.text()
    alert('i think you wanted ' + color);
  } else {
    alert('sorry could not find your email')
  }

};

function App() {
  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState('');
  const [colour, setColour] = useState('');

  return (
    <div className="app">
      <img className="icon" src="/yellowshirt.svg" alt="yellowshirt" />
      <h1>
        <span className="yellow">yellow</span>
        <span className="shirt">shirt</span>
      </h1>
      <div style={{ marginLeft: '40px' }}>
        <p>Enter your email for a free shirt</p>
        <input
          type="email"
          name="my_email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email here"
        />
        <br />
        <input
          type="text"
          name="choose_colour"
          onChange={(e) => setColour(e.target.value)}
          placeholder="What colour shirt?"
        />
        <br />
        <button onClick={() => subscribe_shirt_fan(email, colour)}>
          sign me up bro
        </button>
      </div>
      <div style={{ marginLeft: '40px' }}>
        <p>Forgot which colour you ordered?</p>
        <input
          type="email"
          name="check_email"
          onChange={(e) => setCheckEmail(e.target.value)}
          placeholder="Type your email here"
        />
        <br />
        <button onClick={() => check_colour(checkEmail)}>
          what was it again
        </button>
      </div>
    </div>
  );
}

export default App;
