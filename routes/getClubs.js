import express from 'express';
import connectDB from '../mongodbConnection.js';

const router = express.Router();

router.get('/' , async (req,res) => {
    try{
        const { client, database } = await connectDB();
        const clubsCollection = database.collection('Clubs');
        const allClubs = await clubsCollection.find().toArray();

        if (allClubs.length === 0) {
            console.log("No clubs found");
            res.status(404).json({message: "No clubs found"});
        }
        console.log("Clubs found: " , allClubs);
        res.status(200).json(allClubs);

        await client.close();
    } catch(error){
        console.error("Error fetching clubs: " , error);
        res.status(500).json({message: "Internal server error"});
    }
});

export default router;
