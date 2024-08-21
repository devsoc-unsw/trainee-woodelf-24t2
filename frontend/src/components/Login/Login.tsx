import classes from "./Login.module.scss";

function Login() {
  return (
    <div className={classes.container}>
      <div className={classes.sheet}>
        <h1>login ty</h1>
        <form className={classes.form}>
        <span className={classes.label}>Username</span>
        <input name="email" type="text" />
          <span className={classes.label}>Password</span>
          <input name="password" type="password" />
          <button className={classes.button}>Login</button>
          <div className={classes.register} >Don't have an account? <span className={classes.blue}>Register</span></div>
          </form>
      </div>
      
      <div id="overlay-root"></div>
    </div>
  );
}

export default Login;