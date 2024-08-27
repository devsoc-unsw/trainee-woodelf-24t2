import express, { Response } from "express";
import session from "express-session";
import { TypedRequest, LoginBody } from "./requestTypes";
import { SessionStorage, User } from "./interfaces";
import bcrypt from "bcrypt";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { db } from "./firebase";
import cors from "cors";
import crypto from "crypto";

const session_auth = async (sessionId: string): Promise<boolean> => {
  const users = collection(db, "sessions");
  const sessionData = query(users, where("sessionId", "==", sessionId));
  const session = await getDocs(sessionData);

  if (session.empty) {
    return false;
  }

  // if current time is less than expiration date, return true
  return new Date() < session.docs[0].data().expirationDate;
}

const EXPRESS_PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    saveUninitialized: false,
    /* I'm not entirely sure of the effects,
     ** but since our sessions use expiration dates and based on the express-session doc,
     ** I've set it to true
     */
    resave: true,
  }),
);

app.listen(EXPRESS_PORT, () => {
  console.log(
    `👕💛 yellowshirt backend listening on port ${EXPRESS_PORT} 💛👕`,
  );
});

app.post("/register", async (req: TypedRequest<LoginBody>, res: Response) => {
  const { username, password } = req.body;

  const querySnapshot = await getDocs(collection(db, "users"));
  if (querySnapshot.docs.some((doc) => doc.data().username === username)) {
    return res.status(400).send("Username already exists");
  }

  const salt: string = crypto.randomBytes(128).toString("base64");
  const saltedPassword: string = password.concat(salt);

  const saltRounds: number = 10;
  const hashedPassword: string = await bcrypt.hash(saltedPassword, saltRounds);

  const newUser: User = {
    username,
    password: hashedPassword,
    salt: salt,
    dateJoined: new Date(),
    highScore: 0,
    cumulativeScore: 0,
    shirts: 0,
  };

  await addDoc(collection(db, "users"), newUser);

  res.status(201).send("User Successfully Registered");
});

app.post("/login", async (req: TypedRequest<LoginBody>, res: Response) => {
  const { username, password } = req.body;
  const users = collection(db, "users");
  const loginDetails = query(users, where("username", "==", username));
  const details = await getDocs(loginDetails);

  if (details.empty) {
    return res.status(400).send("Username not found");
  }

  const saltedPassword = password.concat(details.docs[0].data().salt);

  bcrypt.compare(
    saltedPassword,
    details.docs[0].data().password,
    async (err, result: boolean) => {
      if (err) {
        return res.status(500).send("Error processing password");
      }

      if (result) {
        req.session.userId = details.docs[0].id;
        const expiryTime: Date = new Date();
        expiryTime.setDate(expiryTime.getDate() + 7);

        const session: SessionStorage = {
          sessionId: req.sessionID,
          userId: details.docs[0].id,  // assuming userId is the docRef
          creationDate: new Date(),
          expirationDate: expiryTime
        }

        await addDoc(collection(db, 'sessions'), session);

        res.status(201).send('Login succesful!');
      } else {
        res.status(401).send('Login unsuccesful!');
      }
    },
  );
});
