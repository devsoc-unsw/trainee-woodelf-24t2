import { useRef, useState } from "react";
import classes from "../Forms.module.scss";
import { X } from "lucide-react";

function LoginPage({ onClick }: { onClick: () => void }) {
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [usernameAvaliable, setUsernameAvaliable] = useState(true);
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const confirmPasswordField = useRef<HTMLInputElement>(null);
  const usernameField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (!passwordMatch) {
      setPasswordMatch(true);
    }
    if (!usernameAvaliable) {
      setUsernameAvaliable(true);
    }
    if (usernameEmpty) setUsernameEmpty(false);
    if (passwordEmpty) setPasswordEmpty(false);
    if (confirmPasswordEmpty) setConfirmPasswordEmpty(false);
    if (!passwordValid) setPasswordValid(true);
    usernameField.current?.classList.remove(classes.inputError);
    passwordField.current?.classList.remove(classes.inputError);
    confirmPasswordField.current?.classList.remove(classes.inputError);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.username === "") {
      usernameField.current?.classList.add(classes.inputError);
      return setUsernameEmpty(formData.username === "");
    }
    if (formData.password === "") {
      passwordField.current?.classList.add(classes.inputError);
      return setPasswordEmpty(formData.password === "");
    }
    if (formData.confirmPassword === "") {
      confirmPasswordField.current?.classList.add(classes.inputError);
      return setConfirmPasswordEmpty(formData.confirmPassword === "");
    }
    if (formData.confirmPassword !== formData.password) {
      confirmPasswordField.current?.classList.add(classes.inputError);
      return setPasswordMatch(false);
    }

    if (!passwordPattern.test(formData.password)) {
      passwordField.current?.classList.add(classes.inputError);
      confirmPasswordField.current?.classList.add(classes.inputError);
      return setPasswordValid(false);
    }
    try {
      const resp = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (resp.ok) {
        console.log("success");
        onClick();
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
        <button className={classes.close} onClick={onClick}>
          <X />
        </button>
        <h1 className={classes.title}>Register!</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <span className={classes.label}>Username</span>
          <input
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
          {!usernameAvaliable && (
            <div className={classes.warning} style={{ marginBottom: "10px" }}>
              Username unavaliable.
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
          />
          {passwordEmpty && (
            <div className={classes.warning} style={{ paddingBottom: "10px" }}>
              Please enter your password
            </div>
          )}
          <span className={classes.label}>Confirm Password</span>
          <input
            className={classes.input}
            ref={confirmPasswordField}
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {confirmPasswordEmpty && (
            <div className={classes.warning}>Please enter your password</div>
          )}
          {!passwordMatch && (
            <div className={classes.warning}>Passwords do not match.</div>
          )}
          {!passwordValid && (
            <div className={classes.warning}>
              Password must be 8 to 25 characters long and include at least one
              letter, one number, and one special character
            </div>
          )}
          <input type="submit" className={classes.button} value="Register" />
          <div className={classes.register}></div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
