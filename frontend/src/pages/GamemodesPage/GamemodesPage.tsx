import classes from "./GamemodesPage.module.scss";
import Sheet from "../../components/Sheet/Sheet";
import Card from "../../components/Card/Card";
import poggers from "/poggers.png";
import hacker from "/hackermans.gif";
import { useNavigate } from "react-router-dom";

function GamemodesPage() {
  const navigate = useNavigate();
  return (
    <Sheet gamemode>
      <h1 className="title">Select Gamemode</h1>
      <div className={classes.mainContent}>
        <Card
          titleColor="#8eda87"
          textColor="#ffffff"
          cardTitleText="Exploration"
          cardBodyText="Explore UNSW’s lush campus at your own pace!"
          img={poggers}
          onClick={() => { navigate('/play'), { state: { gamemode: 'exploration' } } }}
        />
        <Card
          titleColor="#f17e7e"
          textColor="#ffffff"
          cardTitleText="Timed"
          cardBodyText="Race the clock at UNSW! Find your way or get lost like a first-year during O-Week!"
          img={hacker}
          onClick={() => { navigate('/play'), { state: { gamemode: 'timed' } } }}
        />
      </div>
    </Sheet>
  );
}

export default GamemodesPage;
