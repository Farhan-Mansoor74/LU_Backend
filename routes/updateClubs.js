const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// PUT update lesson
router.put('/:id', async (req, res) => {
    const db = req.app.locals.db;
    const { id } = req.params;
    try {
        const updateResult = await db.collection('Lessons').updateOne(
            { _id: ObjectId(id) }, // Match lesson by ID
            { $set: req.body } // Update the specified fields
        );

        if (updateResult.matchedCount === 0) {
            res.status(404).json({ error: 'Lesson not found' });
        } else {
            res.status(200).json({ message: 'Lesson updated successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update lesson', details: err.message });
    }
});

module.exports = router;
