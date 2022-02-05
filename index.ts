import express from 'express';
import cors from 'cors';
import db from './db';
import router from './routes/index';
import errorHandler from './middleware/errorHandlingMiddleware';
import { ApiError } from './errors/ApiError';


const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use(errorHandler);
async function start() {
  try {
    await db.authenticate();
    await db.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
