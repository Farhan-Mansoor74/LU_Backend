const express = require('express');
const router = express.Router();

// POST new order
router.post('/', async (req, res) => {
    const db = req.app.locals.db;
    try {
        const result = await db.collection('Orders').insertOne(req.body);
        res.status(201).json(result.ops[0]); // Respond with the created order
    } catch (err) {
        res.status(500).json({ error: 'Failed to add order', details: err.message });
    }
});

module.exports = router;
