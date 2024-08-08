import classes from './Login.module.css'

function Login() {
  return (
    <div className={classes.sheet}>
      <form className={classes.form}>
        <span className={classes.label}>email</span>
        <input
          name="email"
          placeholder="enter email"
          type="text"
        />
        <span className={classes.label}>password</span>
        <input
          name="password"
          placeholder="enter password"
          type="password"
        />
        <button>
          login
        </button>
      </form>

    </div>
  )
}

export default Login