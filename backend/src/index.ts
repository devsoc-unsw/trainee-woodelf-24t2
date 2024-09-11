import express, { Response, Request } from "express";
import session from "express-session";
import {
  TypedRequest,
  TypedRequestQuery,
  LoginBody,
  LeaderboardQuery,
} from "./requestTypes";
import { SessionStorage, User, LoginErrors, Level, Gamemode, Hotspot } from "./interfaces";
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
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { ScoreEntry } from "./interfaces";
import { db } from "./firebase";
import cors from "cors";
import crypto from "crypto";

const EXPRESS_PORT = 3000;
const games = collection(db, "games");
const sessions = collection(db, "sessions");
const users = collection(db, "users");

const session_auth = async (sessionId: string) => {
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

const session_remove = async (sessionId: string) => {
  const sessionData = query(sessions, where("sessionId", "==", sessionId));
  const session = await getDocs(sessionData);

  if (session.empty) return false;

  session.forEach(async (sessionDoc) => {
    const ref = sessionDoc.ref;
    await deleteDoc(ref);
  });

  return true;
};

const sessionIdToUserId = async (
  sessionId: string,
): Promise<string | undefined> => {
  const sessionData = query(sessions, where("sessionId", "==", sessionId));
  const session = await getDocs(sessionData);

  if (session.empty) {
    return undefined;
  } else {
    return session.docs[0].data().userId;
  }
};

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_LOCAL as string,
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use(
  session({
    cookie: {
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      maxAge: 604800000,
      // If not development, assume production and set secure to true
      secure: process.env.NODE_ENV !== "development" ? true : false,
      httpOnly: true,
    },
    secret: process.env.SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false,
  }),
);

app.get("/user", async (req: Request, res: Response) => {
  // if sessionId is in the DB and not expired --> session is a user.
  // if not --> session is a guest.
  const sessionId = req.sessionID;
  const sessionData = query(sessions, where("sessionId", "==", sessionId));
  const session = await getDocs(sessionData);

  if (session.empty) {
    return res.status(404).send("No user found!");
  } else if (!(await session_auth(sessionId))) {
    return res.status(401).send("Session expired.");
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

  const querySnapshot = await getDocs(users);
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

  await addDoc(users, newUser);

  return res.status(201).send("User Successfully Registered");
});

app.post("/login", async (req: TypedRequest<LoginBody>, res: Response) => {
  const { username, password } = req.body;
  const loginDetails = query(users, where("username", "==", username));
  const details = await getDocs(loginDetails);

  const errorCheck: LoginErrors = {
    usernameNotFound: false,
    passwordInvalid: false,
  };

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

          await addDoc(sessions, session);
          return res.status(200).json(errorCheck);
        });
      } else {
        errorCheck.passwordInvalid = true;
        return res.status(401).json(errorCheck);
      }
    },
  );
});
// curl -H 'Content-Type: application/json' -d '{ "email": "ben", "color": "pink"}' -X POST http://localhost:3000/subscribe

app.get(
  "/startGame",
  async (
    req: TypedRequestQuery<{ roundCount: number; gameMode: Gamemode }>,
    res,
  ) => {
    const getDoc = await getDocs(collection(db, "levels"));

    const { roundCount, gameMode } = req.query;

    // array of level IDs
    const docIds = getDoc.docs.map((doc) => doc.id);
    const shuffled = docIds.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, roundCount);
    const levels: Level["id"][] = [];
    selected.forEach((location) => levels.push(location));

    res.status(200).json(levels);
  },
);

app.get("/level", async (req: TypedRequestQuery<{levelId: string}>, res: Response) => {
  const levelId = req.query.levelId;
  const docRef =  doc(db, "levels", levelId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    res.status(404).json({ error: "Level not found" });
    return;
  }

  const levelData = docSnap.data();

  const floorMap = {
    LG: 0,
    G: 1,
    L1: 2,
    L2: 3,
    L3: 4,
    L4: 5,
    L5: 6,
    L6: 7,
  };

  const hotspots: Hotspot[] = []
  levelData.hotspots.forEach((h) => {
    hotspots.push(
      {
        levelId: h.levelId,
        pitch: h.pitch,
        yaw: h.yaw,
        targetPitch: h.targetPitch,
        targetYaw: h.targetYaw,
      }
    )
  })


  const level: Level = {
    photoLink: levelData.panorama,
    locationName: levelData.title,
    latitude: levelData.latitude,
    longitude: levelData.longitude,
    zPosition: floorMap[levelData.floor] ?? 1, // if floor is undefined, then location must be G (eg. a lawn)
    hotspots: hotspots,
  }

  res.status(200).json(level);
});

app.get(
  "/leaderboard/data",
  async (req: TypedRequestQuery<LeaderboardQuery>, res: Response) => {
    const { pagenum, gamemode, increments } = req.query;
    const queryGames = query(games, where("gamemode", "==", Number(gamemode)));
    const querySnapshot = await getDocs(queryGames);
    const highestScores: { [username: string]: { id: string; score: number } } =
      {};
    if (querySnapshot.empty) {
      return res.status(204).send("No data!");
    }
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      const username = data.username;
      const score = data.score;
      const id = docSnapshot.id;

      if (!highestScores[username] || score > highestScores[username].score) {
        highestScores[username] = { id, score };
      }
    });

    const ids = Object.values(highestScores).map((user) => user.id);

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

app.post("/logout", async (req: Request, res: Response) => {
  const sessionId = req.sessionID;
  if (!(await session_remove(sessionId))) {
    console.log("Not logged in");
    return res.status(400).send("Not logged in");
  }

  req.session.destroy((err) => {
    if (err) {
      console.log("Couldn't destroy session");
      return res.status(400).send("Error destroying session.");
    }
    console.log("Successfully logged out");
    return res.status(200).send("Logout Successful!");
  });
});
