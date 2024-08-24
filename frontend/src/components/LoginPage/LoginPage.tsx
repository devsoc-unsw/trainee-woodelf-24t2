import { useRef, useState } from "react";
import classes from "./LoginPage.module.scss";

function LoginPage({ onClick }: { onClick: () => void }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [usernameFound, setUsernameFound] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const usernameField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (!usernameFound) setUsernameFound(true);
    if (!passwordMatch) setPasswordMatch(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (resp.ok) {
        console.log("success");
      } else {
        console.log("failure");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.sheet}>
        <h1>Welcome!</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <span className={classes.label}>Username</span>
          <input
            ref={usernameField}
            className={classes.input}
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {!usernameFound && (
            <div className={classes.warning} style={{ paddingBottom: "10px" }}>
              Username not found
            </div>
          )}
          <span className={classes.label}>Password</span>
          <input
            ref={passwordField}
            className={classes.input}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <div className={classes.warning}>Incorrect password</div>
          )}
          <input type="submit" className={classes.button} value="Login" />
          <div className={classes.register}>
            Don't have an account?{" "}
            <span className={classes.blue} onClick={onClick}>
              Register
            </span>
            <br /> or play as a <span className={classes.blue}>guest</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
