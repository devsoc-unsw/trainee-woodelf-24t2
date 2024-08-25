import { useRef, useState } from "react";
import classes from "../Forms.module.scss";

function LoginPage({ onClick }: { onClick: () => void }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [usernameFound, setUsernameFound] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const usernameField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);

  const resetState = () => {
    if (!usernameFound) setUsernameFound(true);
    if (!passwordMatch) setPasswordMatch(true);
    if (usernameEmpty) setUsernameEmpty(false);
    if (passwordEmpty) setPasswordEmpty(false);
    usernameField.current?.classList.remove(classes.inputError);
    passwordField.current?.classList.remove(classes.inputError);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    resetState();
  };

  const isFieldEmpty = (field: string) => field === "";

  const errorChecking = (): boolean => {
    if (isFieldEmpty(formData.username.trim())) {
      usernameField.current?.classList.add(classes.inputError);
      setUsernameEmpty(true);
      return false;
    }
    if (isFieldEmpty(formData.password)) {
      passwordField.current?.classList.add(classes.inputError);
      setPasswordEmpty(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!errorChecking()) return;
    if (isProcessing) return;
    setIsProcessing(true);

    // formData.username = formData.username.trim();
    try {
      const resp = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // need backend for auth/login to display errors for username not found / password invalid.
      if (resp.ok) {
        console.log("success");
      } else {
        console.log("failure");
      }
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.sheet}>
        <h1 className={classes.title}>Welcome!</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <label htmlFor="username" className={classes.label}>
            Username
          </label>
          <input
            id="username"
            ref={usernameField}
            className={classes.input}
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
          {usernameEmpty && (
            <div className={classes.warning} style={{ paddingBottom: "10px" }}>
              Please enter your username
            </div>
          )}
          {!usernameFound && (
            <div className={classes.warning} style={{ paddingBottom: "10px" }}>
              Username not found
            </div>
          )}
          <label htmlFor="password" className={classes.label}>
            Password
          </label>
          <input
            id="password"
            ref={passwordField}
            className={classes.input}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {passwordEmpty && (
            <div className={classes.warning}>Please enter your password</div>
          )}
          {!passwordMatch && (
            <div className={classes.warning}>Incorrect password</div>
          )}
          <input
            type="submit"
            className={classes.button}
            style={{ marginBottom: "5px" }}
            value="Login"
          />
          <div className={classes.register}>
            Don't have an account?{" "}
            <a className={classes.blue} onClick={onClick}>
              Register
            </a>
            <br /> or play as a <a className={classes.blue}>guest</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
