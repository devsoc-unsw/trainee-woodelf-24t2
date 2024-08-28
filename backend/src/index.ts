import express, { Response, Request } from "express";
import session from "express-session";
import { TypedRequest, LoginBody } from "./requestTypes";
import { SessionStorage, User, LoginErrors } from "./interfaces";
import bcrypt from "bcrypt";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  getDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import cors from "cors";
import crypto from "crypto";

const session_auth = async (sessionId: string) => {
  const sessions = collection(db, "sessions");
  const sessionData = query(sessions, where("sessionId", "==", sessionId));
  const session = await getDocs(sessionData);

  if (session.empty) {
    return false;
  }

  // if current time is greater than expiration date, return false and
  // removes it from the database
  if (new Date() > session.docs[0].data().expirationDate.toDate()) {
    await session_remove(sessionId);
    return false;
  }
  return true;
};

// Clears all expired sessions in the db
// Idea, periodically call this to stay efficient on document reads?
const clean_sessions = async () => {
  const sessions = collection(db, "sessions");
  const allSessions = await getDocs(sessions);
  allSessions.forEach(async (sessionDoc) => {
    if (new Date() > sessionDoc.data().expirationDate.toDate()) {
      const ref = sessionDoc.ref;
      await deleteDoc(ref);
    }
  });
};

const session_remove = async (sessionId: string) => {
  const sessions = collection(db, "sessions");
  const sessionData = query(sessions, where("sessionId", "==", sessionId));
  const session = await getDocs(sessionData);

  if (session.empty) return false;

  session.forEach(async (sessionDoc) => {
    const ref = sessionDoc.ref;
    await deleteDoc(ref);
  });

  return true;
};

const EXPRESS_PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  session({
    cookie: {
      sameSite: "lax",
      maxAge: 604800000,
      // If not development, assume production and set secure to true
      secure: (process.env.NODE_ENV !== "development") ? true : false,
    },
    secret: process.env.SESSION_SECRET as string,
    saveUninitialized: false,
    resave: true,
  }),
);

app.post("/session/validate", async (req: Request, res: Response) => {
  const sessionId = req.sessionID;
  if (await session_auth(sessionId)) {
    res.status(200).send("valid sessionID");
  } else {
    res.status(401).send("Invalid sessionID");
  }
});

app.get("/user", async (req: Request, res: Response) => {
  const sessionId = req.sessionID;
  console.log(sessionId);
  const sessions = collection(db, "sessions");
  const sessionData = query(sessions, where("sessionId", "==", sessionId));
  const session = await getDocs(sessionData);

  if (session.empty) {
    return res.status(404).json({ username: null });
  }

  const userId = session.docs[0].data().userId;
  const userDocRef = doc(db, "users", userId);

  getDoc(userDocRef).then((docSnap) => {
    const data = docSnap.data() as User;
    const { password, salt, ...sanitizedData } = data;

    const date = data.dateJoined as Timestamp;
    sanitizedData.dateJoined = date.toDate();
    res.status(200).json(sanitizedData);
  });
});

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

  return res.status(201).send("User Successfully Registered");
});

app.post("/login", async (req: TypedRequest<LoginBody>, res: Response) => {
  const { username, password } = req.body;
  const users = collection(db, "users");
  const loginDetails = query(users, where("username", "==", username));
  const details = await getDocs(loginDetails);

  const errorCheck: LoginErrors = {
    usernameNotFound: false,
    passwordInvalid: false,
  } 
  
  if (details.empty) {
    errorCheck.usernameNotFound = true;
    return res.status(400).json(errorCheck);
  }

  const saltedPassword = password.concat(details.docs[0].data().salt);

  bcrypt.compare(
    saltedPassword,
    details.docs[0].data().password,
    async (err: Error | null, result: boolean) => {
      if (err) {
        return res.status(500).send("Error processing password");
      }

      if (result) {
        req.session.regenerate(async (err: Error | null) => {
          if (err) {
            return res.status(500).send("Error regenerating session.");
          }
          const expiryTime: Date = new Date();
          expiryTime.setDate(expiryTime.getDate() + 7);

          const session: SessionStorage = {
            sessionId: req.sessionID,
            userId: details.docs[0].id, // assuming userId is the docRef
            creationDate: new Date(),
            expirationDate: expiryTime,
          };

          await addDoc(collection(db, "sessions"), session);
          return res.status(201).json(errorCheck);
        });
      } else {
        errorCheck.passwordInvalid = true;
        return res.status(401).json(errorCheck);
      }
    },
  );
});

app.post("/logout", async (req: Request, res: Response) => {
  const sessionId = req.sessionID;
  if (!(await session_remove(sessionId))) {
    return res.send("Not logged in").status(400);
  }

  req.session.destroy((err) => {
    if (err) {
      return res.send("Error destroying session.").status(400);
    }

    return res.send("Logout Successful!").status(200);
  });
});
