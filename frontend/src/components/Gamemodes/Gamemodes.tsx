import classes from "./Gamemodes.module.scss";
import Sheet from "../Forms/Sheet/Sheet";
import Card from "./Card/Card";
import poggers from "/poggers.png";
import hacker from "/hackermans.gif";



function GamemodesPage() {
  return (
    <Sheet sheetGamemode={true}>
      <h1 className={classes.title}>Select Gamemode</h1>
      <div className={classes.mainContent}>
        <Card
          titleColor="#8eda87"
          textColor="#ffffff"
          cardTitleText="Exploration"
          cardBodyText="Explore UNSW’s lush campus at your own pace!"
          img={poggers}
        />
        <Card
          titleColor="#f17e7e"
          textColor="#ffffff"
          cardTitleText="Timed"
          cardBodyText="Race the clock at UNSW! Find your way or get lost like a first-year during O-Week!"
          img={hacker}
        />
      </div>
    </Sheet>
  );
}

export default GamemodesPage;