import express, { Request, Response } from "express";
import { TypedRequest, RegisterBody } from "./requestTypes";
import bcrypt from "bcrypt";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import cors from "cors";

const EXPRESS_PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("yellowshirt backend says hello");
});

app.post(
  "/register",
  async (req: TypedRequest<RegisterBody>, res: Response) => {
    const { username, password } = req.body;

    const querySnapshot = await getDocs(collection(db, "users"));
    if (querySnapshot.docs.some((doc) => doc.data().username === username)) {
      return res.status(400).send("Username already exists");
    }

    const saltRounds: number = 0;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    await addDoc(collection(db, "users"), {
      username,
      password: hashedPassword,
    });

    res.status(201).send("User Successfully Registered");
  },
);

app.post("/subscribe", async (req, res) => {
  const { email, colour } = req.body;
  if (!email || !colour) {
    res.status(400).send("email and colour not specified in request");
    return;
  }
  const docRef = await addDoc(collection(db, "shirt_cravers"), {
    email,
    colour,
  });
  console.log("Subscribed! Doc written: ", docRef.id);
  res.status(200).send(docRef);
});

app.get("/colour", async (req, res) => {
  if (!req.query.email) {
    res.status(400).send("request must specify an email");
    return;
  }
  const querySnapshot = await getDocs(collection(db, "shirt_cravers"));
  let email: string = "";
  querySnapshot.forEach((doc) => {
    if (doc.data().email === req.query.email) {
      email = doc.data().colour;
    }
  });
  if (email) res.status(200).send(email);
  else res.status(404).send("this email does not have a color :(");
});

app.listen(EXPRESS_PORT, () => {
  console.log(
    `👕💛 yellowshirt backend listening on port ${EXPRESS_PORT} 💛👕`,
  );
});

// curl -H 'Content-Type: application/json' -d '{ "email": "ben", "color": "pink"}' -X POST http://localhost:3000/subscribe
