import express from 'express';
import clubsRouter from './routes/getClubs.js';
import ordersRouter from './routes/addOrder.js';
import updateRouter from './routes/updateClubs.js';

const app = express();

app.use(express.json());

// CORS Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Origin,Accept,X-Requested-With,Content-Type");
    next();
});

const PORT = 3000;

app.use('/clubs', clubsRouter);
app.use('/orders', ordersRouter);
app.use('/updateClub', updateRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
