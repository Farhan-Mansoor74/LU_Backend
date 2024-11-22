import express from 'express';
import clubsRouter from './routes/getClubs.js';
import ordersRouter from './routes/addOrder.js';
import updateRouter from './routes/updateClubs.js';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: '*', // Be more specific in production
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const PORT = 5500;

app.use('/clubs', clubsRouter);
app.use('/orders', ordersRouter);
app.use('/updateClub', updateRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
