import classes from "./GamemodesPage.module.scss";
import Sheet from "../Forms/Sheet/Sheet";
import Card from "./Card/Card";
import poggers from "/poggers.jpg";

function GamemodesPage() {
  return (
    <Sheet sheetGamemode={true}>
      <h1 className={classes.title}>Select Gamemode</h1>
      <div className={classes.mainContent}>
        <Card
          titleColor="#8eda87"
          textColor="#ffffff"
          cardTitleText="Exploration"
          cardBodyText="Enjoy the greenery of UNSW to it's fullest!"
          img={poggers}
        />
      </div>
    </Sheet>
  );
}

export default GamemodesPage;
