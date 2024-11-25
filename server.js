import express from 'express';
import clubsRouter from './routes/getClubs.js';
import ordersRouter from './routes/addOrder.js';
import updateRouter from './routes/updateClubs.js';
import logger from './logger.js';

import cors from 'cors';
import path from 'path'; // Required to resolve paths

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(logger);
app.use(express.json());

app.use(express.static('public'));

const PORT = 5500;

app.use('/clubs', clubsRouter);
app.use('/orders', ordersRouter);
app.use('/updateClub', updateRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
