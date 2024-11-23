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

router.get('/search', async (req, res) => {
    try {
        const { query } = req.query; // Get the search query from request parameters
        
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const { client, database } = await connectDB();
        const clubsCollection = database.collection('Clubs');

        // Create a case-insensitive regular expression for searching
        const searchRegex = new RegExp(query, 'i');

        // Search in subject field
        const searchResults = await clubsCollection.find({
            subject: searchRegex
        }).toArray();

        await client.close();

        if (searchResults.length === 0) {
            return res.status(404).json({ 
                message: "No clubs found matching your search",
                results: [] 
            });
        }

        console.log("Search results found:", searchResults);
        res.status(200).json(searchResults);

    } catch (error) {
        console.error("Error performing search:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
