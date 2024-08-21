import classes from "./Login.module.scss";

function Login() {
  return (
    <div className={classes.container}>
      <div className={classes.sheet}>
        <h1>login ty</h1>
        <form className={classes.form}>
        <span className={classes.label}>Username</span>
        <input name="email" placeholder="Enter Email" type="text" />
          <span className={classes.label}>Email</span>
          <input name="email" placeholder="Enter Email" type="text" />
          <span className={classes.label}>Password</span>
          <input name="password" placeholder="Enter Password" type="password" />
          <button className={classes.button}>Login</button>
          </form>
      </div>
      <div id="overlay-root"></div>
    </div>
  );
}

export default Login;