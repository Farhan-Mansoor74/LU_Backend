import express from 'express';
import connectDB from '../mongodbConnection.js';
import { ObjectId } from 'mongodb';
const router = express.Router();

// Router to update club availability after user submits an order
router.put('/:clubId', async (req, res) => {
    try {
        const { client, database } = await connectDB();
        const clubsCollection = database.collection('Clubs');
        const { clubId } = req.params;
        const { quantity = 1 } = req.body; // Default to 1 if not provided

        // First get the current club to check inventory
        const club = await clubsCollection.findOne({ _id: new ObjectId(clubId) });
        
        if (!club) {
            console.log("No club found with ID:", clubId);
            res.status(404).json({ message: "Club not found" });
            return;
        }

        // Calculate new inventory
        const newInventory = club.availableInventory - quantity;
        
        // Validate inventory won't go negative
        if (newInventory < 0) {
            res.status(400).json({ 
                message: "Not enough inventory available",
                availableInventory: club.availableInventory
            });
            return;
        }

        console.log('Updating club:', {
            clubId,
            currentInventory: club.availableInventory,
            quantityToReduce: quantity,
            newInventory: newInventory
        });

        // Updates available inventory to new inventory
        const result = await clubsCollection.updateOne(
            { _id: new ObjectId(clubId) },
            { $set: { availableInventory: newInventory } }
        );

        console.log('Update result:', {
            matchedCount: result.matchedCount, //Indicates the number of documents that matched the filter criteria.
            modifiedCount: result.modifiedCount //Indicates the number of documents that were modified by the update operation.
        });

        console.log("Club availability updated:", clubId);
        res.status(200).json({ 
            message: "Availability updated successfully",
            newAvailability: newInventory
        });

        await client.close();
    } catch (error) {
        console.error("Error updating club availability:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;