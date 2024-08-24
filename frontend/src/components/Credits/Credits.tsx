import classes from "./Credits.module.scss";

function Credits() {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <h1 className={classes.title}>Credits</h1>
        <ul className={classes.creditstext}>
          <li>Alyssa Cheong</li>
          <li>Ben Godwin</li>
          <li>Chris Wong</li>
          <li>Lachlan Shoesmith</li>
          <li>Osvaldo Prajitno</li>
        </ul>
      </div>
    </div>
  );
}

export default Credits;
