import classes from "./Card.module.scss";

interface CardProps {
  titleColor: string;
  textColor: string;
  cardTitleText: string;
  cardBodyText: string;
  img: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function Card(props: CardProps) {
  return (
    <div
      className={classes.card}
      onClick={props.onClick}
    >
      <img src={props.img} className={classes.cardImage} />
      <div className={classes.cardTextBox}>
        <h1
          className={classes.cardTitle}
          style={{
            color: `${props.titleColor}`,
          }}
        >
          {props.cardTitleText}
        </h1>
        <p
          className={classes.cardText}
          style={{
            color: `${props.textColor}`,
          }}
        >
          {props.cardBodyText}
        </p>
      </div>
    </div>
  );
}

export default Card;
