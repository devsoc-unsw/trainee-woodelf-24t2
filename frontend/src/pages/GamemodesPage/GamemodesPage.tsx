import classes from "./GamemodesPage.module.scss";
import Sheet from "../../components/Sheet/Sheet";
import Card from "../../components/Card/Card";
import poggers from "/poggers.png";
import hacker from "/hackermans.gif";

function GamemodesPage() {
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
