import '@fontsource/hammersmith-one';
import './App.css';
import { useState } from 'react';
import YellowButton from './components/YellowButton';

function App() {
  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState('');
  const [colour, setColour] = useState('');

  return (
    <div className="app">
        <YellowButton></YellowButton>
    </div>
  );
}

export default App;
