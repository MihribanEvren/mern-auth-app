import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import router from './router/route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('dev'));
app.disable('x-powered-by');

app.use('/api', router);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
