import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', router);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send({ status: 'ok', message: 'Server is running' });
});

// logging with timestamp
const log = (message: string) => {
  console.log(`[${new Date().toUTCString()}] ${message}`);
};
export default app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    log(`Server is running on http://localhost:${PORT}`);
  });
}
