import { useState } from "react";
import classes from "./LoginPage.module.scss";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
          <span className={classes.label}>Password</span>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input type="submit" className={classes.button} value="Login" />
          <div className={classes.register}>
            Don't have an account?{" "}
            <span className={classes.blue}>Register</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
