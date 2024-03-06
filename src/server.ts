import express, { Request, Response } from 'express';
import db from "../sequelize.config";

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

db.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch((error) => console.error('Unable to connect to the database:', error));
