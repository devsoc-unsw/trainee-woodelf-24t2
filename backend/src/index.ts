import express, { Response } from "express";
import session from "express-session";
import { TypedRequest, LoginBody, ParamsType} from "./requestTypes";
import bcrypt from "bcrypt";
import { collection, addDoc, getDocs, where, query, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import cors from "cors";
import crypto from "crypto";

const EXPRESS_PORT = 3000;

// only meant for debugging / delete for production
const store = new session.MemoryStore();

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
    resave: true
  }),
);

app.post('/logout', async (req, res) => {
  const sessionId = req.sessionID;
  const querySnapshot = await getDocs(collection(db, 'sessions'))
  let docRef: string | undefined;
  querySnapshot.forEach(doc => {
    if (doc.data().sessionId === sessionId) {
      docRef = doc.id;
    }
  })

  if (docRef === undefined) {
    res.send('Not logged in').status(400);
    return;
  }
  deleteDoc(doc(db, 'sessions', docRef));

  req.session.destroy(() => {
    console.log('cookies removed');
  });

  res.send('Goodbye!').status(200);
})

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
  const userLoginDetailsRef = await addDoc(collection(db, "userLoginDetails"), {
    username,
    password: hashedPassword,
    salt: salt,
  });

  const docRef = await addDoc(collection(db, "userDetails"), {
    username,
    dateJoined: Date(),
  });

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

app.get('/startGame', async (req: ParamsType<{roundCount: number}>, res) => {

    const getDoc = await getDocs(collection(db, 'test_locations'));
    const allLocations = getDoc.docs.map(doc => doc.data);

    const n = req.params.roundCount;
    // Shuffle array
    const shuffled = allLocations.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, n);

    res.status(200).json(selected);
    
})
