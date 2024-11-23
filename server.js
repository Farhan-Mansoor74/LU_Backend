import express from 'express';
import clubsRouter from './routes/getClubs.js';
import ordersRouter from './routes/addOrder.js';
import updateRouter from './routes/updateClubs.js';
import cors from 'cors';
import logger from './logger.js'; 
import path from 'path';

const app = express();

app.use(cors({
    origin: '*', // Be more specific in production
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(logger);

// Serve static files from the 'images' folder
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());

const PORT = 5500;

app.use('/clubs', clubsRouter);
app.use('/orders', ordersRouter);
app.use('/updateClub', updateRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
