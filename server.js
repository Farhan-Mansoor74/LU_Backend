// Main file
//Importing modules required
import express from 'express';
import clubsRouter from './routes/getClubs.js';
import ordersRouter from './routes/addOrder.js';
import updateRouter from './routes/updateClubs.js';
import logger from './logger.js';

import cors from 'cors';

const app = express();
const PORT = 5500;

// Enabling Cross-origin resource sharing
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to log HTTP requests sent
app.use(logger);

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Serves static files from public directory
app.use(express.static('public'));

// Mounting routers to specific routes
app.use('/clubs', clubsRouter);
app.use('/orders', ordersRouter);
app.use('/updateClub', updateRouter);

// Starts the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
