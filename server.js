const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const clubsRouter = require('./routes/getClubs');
const ordersRouter = require('./routes/addOrder');
const lessonsRouter = require('./routes/updateClubs');

// Middleware
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

// MongoDB Connection
const uri = 'mongodb+srv://farhanmansoordxb:farhan8431@cluster0.tb5vm.mongodb.net/';
let db;

MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;

    db = client.db('Webstore');
    console.log('Connected to MongoDB Atlas');
    
    // Pass `db` to routes
    app.locals.db = db;

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});

// Use Routes
app.use('/clubs', clubsRouter);
app.use('/orders', ordersRouter);
app.use('/lessons', lessonsRouter);

// // Default Route
// app.get('/', (req, res) => {
//     res.send('Welcome to the After-School Club API!');
// });
