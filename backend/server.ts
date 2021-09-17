import express from 'express';

const app = express();
const port = 8080;

app.use('/', express.static('frontend/public'));

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});