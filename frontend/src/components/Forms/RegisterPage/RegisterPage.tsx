import { useState } from "react";
import classes from "../Forms.module.scss";
import Sheet from "../Sheet/Sheet";
import classNames from "classnames";
import WarningText from "../WarningText/WarningText";

function LoginPage({ onClick }: { onClick: () => void }) {
  const passwordPattern =
    /^(?!.*\s)(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
  const usernamePattern = /^[A-Za-z0-9]{3,16}$/;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const resetState = () => {
    if (!passwordMatch) setPasswordMatch(true);
    if (!usernameAvailable) setUsernameAvailable(true);
    if (usernameEmpty) setUsernameEmpty(false);
    if (passwordEmpty) setPasswordEmpty(false);
    if (confirmPasswordEmpty) setConfirmPasswordEmpty(false);
    if (!passwordValid) setPasswordValid(true);
    if (!usernameValid) setUsernameValid(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    resetState();
  };

  const isFieldEmpty = (field: string, trim: boolean = false): boolean =>
    trim ? field === "" : field.trim() === "";

  const isPasswordEqual = (
    password: string,
    confirmPassword: string,
  ): boolean => password === confirmPassword;

  const validateLoginAttempt = (): boolean => {
    // Checks the fields are empty
    if (isFieldEmpty(formData.username, true)) {
      setUsernameEmpty(true);
      return false;
    }
    if (!usernamePattern.test(formData.username)) {
      setUsernameValid(false);
      return false;
    }
    if (isFieldEmpty(formData.password)) {
      setPasswordEmpty(true);
      return false;
    }
    if (isFieldEmpty(formData.confirmPassword)) {
      setConfirmPasswordEmpty(true);
      return false;
    }

    // Checks confirmPass = Pass
    if (!isPasswordEqual(formData.password, formData.confirmPassword)) {
      setPasswordMatch(false);
      return false;
    }

    // Checks pass with regex
    if (!passwordPattern.test(formData.password)) {
      setPasswordValid(false);
      return false;
    }

    return true;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateLoginAttempt()) return;

    if (isProcessing) return;
    setIsProcessing(true);
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
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Sheet sheetLogin={true}>
      <h1 className={classes.title}>Register!</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label htmlFor="username" className={classes.label}>
          Username
        </label>
        <input
          id="username"
          className={classNames(classes.input, {
            [classes.inputError]:
              usernameEmpty || !usernameAvailable || !usernameValid,
          })}
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
        {!usernameValid && (
          <WarningText
            text="Username must be between 3-16 characters and only contain alphabetical or numberic characters."
            paddingBottom={10}
          />
        )}
        {usernameEmpty && (
          <WarningText text="Please enter your username." paddingBottom={10} />
        )}
        {!usernameAvailable && (
          <WarningText text="Username unavaliable." paddingBottom={10} />
        )}
        <label htmlFor="password" className={classes.label}>
          Password
        </label>
        <input
          id="password"
          className={classNames(classes.input, {
            [classes.inputError]: !passwordValid || passwordEmpty,
          })}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {passwordEmpty && (
          <WarningText text="Please enter your password." paddingBottom={10} />
        )}
        <label htmlFor="confirmPassword" className={classes.label}>
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          className={classNames(classes.input, {
            [classes.inputError]:
              confirmPasswordEmpty || !passwordMatch || !passwordValid,
          })}
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {confirmPasswordEmpty && (
          <WarningText text="Please enter your password." paddingBottom={0} />
        )}
        {!passwordMatch && (
          <WarningText text="Passwords do not match." paddingBottom={0} />
        )}
        {!passwordValid && (
          <WarningText
            text="Password must be 8 to 64 characters long with no spaces and include
            at least one letter, one number, and one special character."
            paddingBottom={0}
          />
        )}
        <input type="submit" className={classes.button} value="Register" />
        <div className={classes.register}>
          <a className={classes.link} onClick={onClick}>
            Go back
          </a>
        </div>
      </form>
    </Sheet>
  );
}

export default LoginPage;