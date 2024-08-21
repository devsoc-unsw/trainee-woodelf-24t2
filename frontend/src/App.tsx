import "@fontsource/hammersmith-one";
import "./App.scss";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";

function App() {
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
