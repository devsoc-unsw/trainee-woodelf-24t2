import express, { Response } from "express";
import session from "express-session";
import {
  TypedRequest,
  TypedRequestQuery,
  LoginBody,
  LeaderboardQuery,
} from "./requestTypes";
import bcrypt from "bcrypt";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  doc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { Gamemode, ScoreEntry } from "./interfaces";
import { db } from "./firebase";
import cors from "cors";
import crypto from "crypto";

const EXPRESS_PORT = 3000;
const games = collection(db, "games");

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
      secure: process.env.NODE_ENV !== "development" ? true : false,
    },
    secret: process.env.SESSION_SECRET as string,
    saveUninitialized: false,
    resave: true,
  }),
);

app.post("/logout", async (req, res) => {
  const sessionId = req.sessionID;
  const querySnapshot = await getDocs(collection(db, "sessions"));
  let docRef: string | undefined;
  querySnapshot.forEach((doc) => {
    if (doc.data().sessionId === sessionId) {
      docRef = doc.id;
    }
  });

  if (docRef === undefined) {
    res.send("Not logged in").status(400);
    return;
  }
  deleteDoc(doc(db, "sessions", docRef));

  req.session.destroy(() => {
    console.log("cookies removed");
  });

  res.send("Goodbye!").status(200);
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

app.get(
  "/leaderboard/data",
  async (req: TypedRequestQuery<LeaderboardQuery>, res: Response) => {
    const { pagenum, gamemode, increments } = req.query;

    const queryGames = await query(
      games,
      where("gamemode", "==", Number(gamemode)),
    );
    const querySnapshot = await getDocs(queryGames);
    const highestScores: { [username: string]: { id: string; score: number } } =
      {};
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      const username = data.username;
      const score = data.score;
      const id = docSnapshot.id;

      if (!highestScores[username] || score > highestScores[username].score) {
        highestScores[username] = { id, score };
      }
    });

    const ids: string[] = [];
    for (const usernames in highestScores) {
      ids.push(highestScores[usernames].id);
    }
    if (ids.length == 0) {
      return res.status(400).send("error");
    }

    const queryUniqueScores = await query(
      games,
      where("__name__", "in", ids),
      orderBy("score", "desc"),
    );
    const queryScoreSnapshot = await getDocs(queryUniqueScores);

    const start = (pagenum - 1) * increments;
    const size = queryScoreSnapshot.size;
    const pageCount = Math.ceil(size / increments);
    if (start >= size || start < 0) {
      return res.status(400).send("No data!");
    }

    const data: ScoreEntry[] = [];

    for (let i = 0; i < increments && i + start < size; i++) {
      const dataEntry: ScoreEntry = {
        rank: i + start + 1,
        username: queryScoreSnapshot.docs[i + start].data().username,
        score: queryScoreSnapshot.docs[i + start].data().score,
      };
      data.push(dataEntry);
    }

    return res.status(200).json({
      leaderboardData: data,
      pageCount: pageCount,
    });
  },
);
