import classes from "./Credits.module.scss";

function Credits() {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.title}>Credits</div>
        Made with the most amazing team:
        <div className={classes.creditstext}>
          <ul>
            <li>Lachlan Shoesmith: Master of Yapping</li>
            <li>Ben Goldwin: </li>
            <li>Chris Wong: </li>
            <li>Alyssa Cheong: </li>
            <li>Oswaldo Prajitno: </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Credits;
