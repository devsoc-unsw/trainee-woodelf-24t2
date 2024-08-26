import express, { Request, Response } from "express";
import { TypedRequest, LoginBody, RegisterBody } from "./requestTypes";
import bcrypt from "bcrypt";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { db } from "./firebase";
import cors from "cors";
import crypto from "crypto";

const EXPRESS_PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(EXPRESS_PORT, () => {
  console.log(
    `👕💛 yellowshirt backend listening on port ${EXPRESS_PORT} 💛👕`,
  );
});

app.post(
  "/register",
  async (req: TypedRequest<RegisterBody>, res: Response) => {
    const { username, password } = req.body;

    const querySnapshot = await getDocs(collection(db, "users"));
    if (querySnapshot.docs.some((doc) => doc.data().username === username)) {
      return res.status(400).send("Username already exists");
    }

    const salt: string = crypto.randomBytes(128).toString("base64");
    const saltedPassword: string = password.concat(salt);

    const saltRounds: number = 10;
    const hashedPassword: string = await bcrypt.hash(
      saltedPassword,
      saltRounds,
    );
    await addDoc(collection(db, "users"), {
      username,
      password: hashedPassword,
      salt: salt,
    });

    res.status(201).send("User Successfully Registered");
  },
);

app.post("/login", async (req: TypedRequest<LoginBody>, res: Response) => {
  const { username, password } = req.body;
  const users = collection(db, "users");
  const loginDetails = query(users, where("username", "==", username));
  const details = await getDocs(loginDetails);

  if (details.empty) {
    return res.status(400).send("Username not found");
  }
  console.log(details.docs[0].data().salt);

  const saltedPassword = password.concat(details.docs[0].data().salt);
  console.log(saltedPassword);
  bcrypt.compare(
    saltedPassword,
    details.docs[0].data().password,
    (err, result) => {
      if (err) {
        return res.status(500).send("Error processing password");
      }

      return result
        ? res.status(201).send("User Successfully Logged In")
        : res.status(401).send("Incorrect password");
    },
  );
});

// curl -H 'Content-Type: application/json' -d '{ "email": "ben", "color": "pink"}' -X POST http://localhost:3000/subscribe
