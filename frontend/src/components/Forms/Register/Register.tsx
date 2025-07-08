import { useState } from "react";
import classes from "../Forms.module.scss";
import Sheet from "../../Sheet/Sheet";
import classNames from "classnames";
import WarningText from "../WarningText/WarningText";
import { useNavigate } from "react-router-dom";
import { EyeOff, Eye } from "lucide-react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

function Register() {
  const passwordPattern =
    /^(?!.*\s)(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
  const usernamePattern = /^[A-Za-z0-9]{3,16}$/;
  const emailPattern =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [emailEmpty, setEmailEmpty] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const resetState = () => {
    if (!emailEmpty) setEmailEmpty(true);
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
    if (isFieldEmpty(formData.email, true)) {
      setEmailEmpty(true);
      return false;
    }

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
    // to replace
    const auth = getAuth();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.username,
        formData.password,
      );
      const user = userCredentials.user;
      // TODO: process through screens
      console.log(user);
    } catch (err: any) {
      const errorCheck = err.message;
      console.error(errorCheck);
      // TODO: interact with error-related state
    }
    setIsProcessing(false);
  };

  return (
    <Sheet login>
      <h1 className="title">Register!</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label htmlFor="email" className={classes.label}>
          Email
        </label>
        <input
          id="email"
          className={classNames(classes.input, {
            [classes.inputError]: emailEmpty,
          })}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {/* {!emailValid && (
          <WarningText
            text="Email format provided is invalid."
            paddingBottom={10}
          />
        )} */}
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
        <div className={classes.passwordContainer}>
          <input
            id="password"
            className={classNames(classes.input, classes.passwordInput, {
              [classes.inputError]: !passwordValid || passwordEmpty,
            })}
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            style={{
              paddingRight: "30px",
              marginBottom: "10px",
              width: "100%",
            }}
          />
          <button
            type="button"
            className={classes.showPasswordButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye size="20" color="hsl(52, 100%, 50%)" />
            ) : (
              <EyeOff color="hsl(52, 100%, 50%)" size="20" />
            )}
          </button>
        </div>
        {passwordEmpty && (
          <WarningText text="Please enter your password." paddingBottom={10} />
        )}
        <label htmlFor="confirmPassword" className={classes.label}>
          Confirm Password
        </label>
        <div className={classes.passwordContainer}>
          <input
            id="confirmPassword"
            className={classNames(classes.input, classes.passwordInput, {
              [classes.inputError]:
                confirmPasswordEmpty || !passwordMatch || !passwordValid,
            })}
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            className={classes.showPasswordButton}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <Eye size="20" color="hsl(52, 100%, 50%)" />
            ) : (
              <EyeOff color="hsl(52, 100%, 50%)" size="20" />
            )}
          </button>
        </div>
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
          <a
            className={classes.link}
            onClick={() => navigate("/login", { replace: true })}
          >
            Go back
          </a>
        </div>
      </form>
    </Sheet>
  );
}

export default Register;
