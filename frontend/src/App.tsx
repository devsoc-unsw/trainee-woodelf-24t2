import '@fontsource/hammersmith-one';
import './App.css';
import { useState } from 'react';
import YellowButton from './components/yellowbutton/YellowButton';
import Login from './components/login/login';

function App() {
  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState('');
  const [colour, setColour] = useState('');

  return (
    <div className="app">
        <Login></Login>
    </div>
  );
}

export default App;
