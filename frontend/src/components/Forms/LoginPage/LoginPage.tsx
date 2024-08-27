import { useState } from "react";
import classes from "../Forms.module.scss";
import Sheet from "../Sheet/Sheet";
import classNames from "classnames";
import WarningText from "../WarningText/WarningText";

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

  const resetState = () => {
    if (!usernameFound) setUsernameFound(true);
    if (!passwordMatch) setPasswordMatch(true);
    if (usernameEmpty) setUsernameEmpty(false);
    if (passwordEmpty) setPasswordEmpty(false);
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
      setUsernameEmpty(true);
      return false;
    }
    if (isFieldEmpty(formData.password)) {
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
    <Sheet sheetLogin={true}>
      <h1 className={classes.title}>Welcome!</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label htmlFor="username" className={classes.label}>
          Username
        </label>
        <input
          id="username"
          className={classNames(classes.input, {
            [classes.inputError]: usernameEmpty,
          })}
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
        {usernameEmpty && (
          <WarningText text="Please enter your username." paddingBottom={10} />
        )}

        {!usernameFound && (
          <WarningText text="Username not found." paddingBottom={10} />
        )}
        <label htmlFor="password" className={classes.label}>
          Password
        </label>
        <input
          id="password"
          className={classNames(classes.input, {
            [classes.inputError]: passwordEmpty,
          })}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {passwordEmpty && (
          <WarningText text="Please enter your password." paddingBottom={0} />
        )}
        {!passwordMatch && (
          <WarningText text="Please enter your username." paddingBottom={0} />
        )}
        <input
          type="submit"
          className={classes.button}
          style={{ marginBottom: "5px" }}
          value="Login"
        />
        <div className={classes.register}>
          Don't have an account?{" "}
          <a className={classes.link} onClick={onClick}>
            Register
          </a>
          <br /> or play as a <a className={classes.link}>guest</a>
        </div>
      </form>
    </Sheet>
  );
}

export default LoginPage;
