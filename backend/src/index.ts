import express from 'express';

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import cors from 'cors';

const EXPRESS_PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send('yellowshirt backend says hello');
});

app.post('/subscribe', async (req, res) => {
  const {email, colour} = req.body
  if (!email || !colour) {
    res.status(400).send("email and colour not specified in request")
    return
  }
  const docRef = await addDoc(collection(db, 'shirt_cravers'), {
    email,
    colour
  });
  console.log('Subscribed! Doc written: ', docRef.id);
  res.status(200).send(docRef)
});

app.get('/colour', async (req, res) => {
  if (!req.query.email) {
    res.status(400).send("request must specify an email")
    return
  }
  const querySnapshot = await getDocs(collection(db, 'shirt_cravers'));
  let email: string = ""
  querySnapshot.forEach((doc) => {
    if (doc.data().email === req.query.email) {
      email = doc.data().colour
    }
  });
  if (email) res.status(200).send(email)
  else res.status(404).send("this email does not have a color :(")
});

app.listen(EXPRESS_PORT, () => {
  console.log(
    `👕💛 yellowshirt backend listening on port ${EXPRESS_PORT} 💛👕`
  );
});

// curl -H 'Content-Type: application/json' -d '{ "email": "ben", "color": "pink"}' -X POST http://localhost:3000/subscribe