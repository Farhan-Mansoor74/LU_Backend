import express from 'express';
import connectDB from '../mongodbConnection.js';

const router = express.Router();

router.post('/', async (req, res) => {
    console.log('Received order request body:', req.body);

    try {
        const { client, database } = await connectDB();
        const ordersCollection = database.collection('Orders');
        const { name, phone, cart, total } = req.body;

        console.log('Order details:', { name, phone, cart, total });

        const newOrder = {
            name,
            phone,
            cart,
            total,
            createdAt: new Date(),
        };

        const result = await ordersCollection.insertOne(newOrder);
        
        console.log("Order placed successfully", newOrder);
        console.log("Inserted order ID:", result.insertedId);

        res.status(201).json({ 
            message: 'Order placed successfully', 
            orderId: result.insertedId 
        });

        await client.close();
    } catch (error) {
        console.error("Complete error placing order:", error);
        res.status(500).json({ 
            message: "Internal server error", 
            error: error.toString() 
        });
    }
});

export default router;
