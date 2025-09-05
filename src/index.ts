import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send({status:"ok", message:"Server is running"});
});

// logging with timestamp
const log = (message: string) => {
  console.log(`[${new Date().toUTCString()}] ${message}`);
};

app.listen(PORT, () => {
  log(`Server is running on http://localhost:${PORT}`);
});