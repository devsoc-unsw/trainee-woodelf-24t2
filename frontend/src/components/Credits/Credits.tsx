import classes from "./Credits.module.scss";

function Credits() {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <h1>Credits</h1>
        <h2>Made with the most amazing team:</h2>
        <ul className={classes.creditstext}>
          <li>Lachlan Shoesmith: Master of Yapping</li>
          <li>Ben Godwin: </li>
          <li>Chris Wong: </li>
          <li>Alyssa Cheong: </li>
          <li>Osvaldo Prajitno: </li>
        </ul>
      </div>
    </div>
  );
}

export default Credits;
