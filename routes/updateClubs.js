import express from 'express';
import connectDB from '../mongodbConnection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.put('/:clubId', async (req, res) => {
    try {
        const { client, database } = await connectDB();
        const clubsCollection = database.collection('Clubs');
        const { clubId } = req.params;
        const { availableInventory } = req.body;

        console.log('Updating club:', {
            clubId,
            newAvailability: availableInventory
        });

        const result = await clubsCollection.updateOne(
            { _id: new ObjectId(clubId) },
            { $set: { availableInventory } }
        );

        console.log('Update result:', {
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });

        if (result.matchedCount === 0) {
            console.log("No club found with ID:", clubId);
            res.status(404).json({ message: "Club not found" });
            return;
        }

        console.log("Club availability updated:", clubId);
        res.status(200).json({ message: "Availability updated successfully" });
        await client.close();
    } catch (error) {
        console.error("Error updating club availability:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
