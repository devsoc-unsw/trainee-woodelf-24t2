import express from 'express';

const EXPRESS_PORT = 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('yellowshirt backend says hello');
});

app.listen(EXPRESS_PORT, () => {
  console.log(
    `👕💛 yellowshirt backend listening on port ${EXPRESS_PORT} 💛👕`
  );
});
