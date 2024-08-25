import { useRef, useState } from "react";
import classes from "../Forms.module.scss";
import { X } from "lucide-react";

function LoginPage({ onClick }: { onClick: () => void }) {
  const passwordPattern =
    /^(?!.*\s)(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
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
  const [isProcessing, setIsProcessing] = useState(false);

  const resetState = () => {
    if (!passwordMatch) setPasswordMatch(true);
    if (!usernameAvaliable) setUsernameAvaliable(true);
    if (usernameEmpty) setUsernameEmpty(false);
    if (passwordEmpty) setPasswordEmpty(false);
    if (confirmPasswordEmpty) setConfirmPasswordEmpty(false);
    if (!passwordValid) setPasswordValid(true);
    usernameField.current?.classList.remove(classes.inputError);
    passwordField.current?.classList.remove(classes.inputError);
    confirmPasswordField.current?.classList.remove(classes.inputError);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    resetState();
  };

  const isFieldEmpty = (field: string) => field === "";

  const isPasswordEqual = (password: string, confirmPassword: string) =>
    password === confirmPassword;

  const errorChecking = (): boolean => {
    if (isFieldEmpty(formData.username.trim())) {
      usernameField.current?.classList.add(classes.inputError);
      setUsernameEmpty(formData.username.trim() === "");
      return false;
    }
    if (isFieldEmpty(formData.password)) {
      passwordField.current?.classList.add(classes.inputError);
      setPasswordEmpty(formData.password === "");
      return false;
    }
    if (isFieldEmpty(formData.confirmPassword)) {
      confirmPasswordField.current?.classList.add(classes.inputError);
      setConfirmPasswordEmpty(formData.confirmPassword === "");
      return false;
    }
    if (!isPasswordEqual(formData.password, formData.confirmPassword)) {
      confirmPasswordField.current?.classList.add(classes.inputError);
      setPasswordMatch(false);
      return false;
    }

    if (!passwordPattern.test(formData.password)) {
      passwordField.current?.classList.add(classes.inputError);
      confirmPasswordField.current?.classList.add(classes.inputError);
      setPasswordValid(false);
      return false;
    }

    return true;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    
    if (!errorChecking()) return;
    
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
              Password must be 8 to 100 characters long with no spaces and
              include at least one letter, one number, and one special character
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
