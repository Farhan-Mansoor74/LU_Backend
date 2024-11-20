const express = require('express');
const router = express.Router();

// GET all clubs
router.get('/', async (req, res) => {
    const db = req.app.locals.db;
    try {
        const clubs = await db.collection('Products').find({}).toArray();
        res.status(200).json(clubs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch clubs', details: err.message });
    }
});

module.exports = router;
