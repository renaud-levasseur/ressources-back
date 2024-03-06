import express, { Request, Response } from 'express';

const app = express();
const bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
