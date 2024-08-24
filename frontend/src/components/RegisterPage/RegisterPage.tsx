import { useRef, useState } from "react";
import classes from "./RegisterPage.module.scss";
import { X } from "lucide-react";

function LoginPage({ onClick }: { onClick: () => void }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    prePassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [usernameAvaliable, setUsernameAvaliable] = useState(true);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (!passwordMatch) {
      setPasswordMatch(true);
      confirmPassword.current?.classList.remove(classes.inputError);
    }

    if (!usernameAvaliable) {
      setUsernameAvaliable(true);
      confirmPassword.current?.classList.remove(classes.inputError);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.prePassword !== formData.password) {
      setPasswordMatch(false);
      confirmPassword.current?.classList.add(classes.inputError);
      return;
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
        <h1>Register!</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <span className={classes.label}>Username</span>
          <input
            className={classes.input}
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            />
            {!usernameAvaliable && (
              <div className={classes.warning} style={{marginBottom: "10px"}}>Username unavaliable.</div>
            )}
          <span className={classes.label}>Password</span>
          <input
            className={classes.input}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className={classes.label}>Confirm Password</span>
          <input
            className={classes.input}
            ref={confirmPassword}
            name="prePassword"
            type="password"
            value={formData.prePassword}
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <div className={classes.warning}>Passwords do not match.</div>
          )}
          <input type="submit" className={classes.button} value="Register" />
          <div className={classes.register}></div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
