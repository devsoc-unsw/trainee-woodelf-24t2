import { useState } from "react";
import classes from "../Forms.module.scss";
import Sheet from "../../Sheet/Sheet";
import classNames from "classnames";
import WarningText from "../WarningText/WarningText";
import { useNavigate } from "react-router-dom";
import { EyeOff, Eye } from "lucide-react";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [usernameFound, setUsernameFound] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
    const resp = await fetch("https://yellowshirt-backend.fly.dev/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    setIsProcessing(false);

    if (resp.ok) {
      navigate("/gamemodes");
    } else {
      const errorCheck = await resp.json();
      if (errorCheck.usernameNotFound) {
        return setUsernameFound(false);
      } else if (errorCheck.passwordInvalid) {
        return setPasswordMatch(false);
      }
    }
  };

  return (
    <Sheet login>
      <h1 className="title">Welcome!</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label htmlFor="username" className={classes.label}>
          Username
        </label>
        <input
          id="username"
          className={classNames(classes.input, classes.passwordInput, {
            [classes.inputError]: usernameEmpty || !usernameFound,
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
        <div className={classes.passwordContainer}>
          <input
            id="password"
            className={classNames(classes.input, classes.passwordInput, {
              [classes.inputError]: passwordEmpty || !passwordMatch,
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
          <WarningText text="Please enter your password." paddingBottom={0} />
        )}
        {!passwordMatch && (
          <WarningText text="Incorrect password." paddingBottom={0} />
        )}
        <input
          type="submit"
          className={classes.button}
          style={{ marginBottom: "5px" }}
          value="Login"
        />
        <div className={classes.register}>
          Don't have an account?{" "}
          <a
            className={classes.link}
            onClick={() => navigate("/register", { replace: true })}
          >
            Register
          </a>
          <br /> or play as a{" "}
          <a className={classes.link} onClick={() => navigate("/home")}>
            guest
          </a>
        </div>
      </form>
    </Sheet>
  );
}

export default LoginPage;
