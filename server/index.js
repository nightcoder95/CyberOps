import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import route from './routes/dataRoute.js'
import cors from 'cors';
import dotenv from 'dotenv';



const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.use('/api', route)


app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            process.env.FRONTEND_URL,
            process.env.FRONTEND_URL_LocalHost
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

/* The code snippet is setting up the configuration for the server's port and MongoDB connection URL
using environment variables. */
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/CyberOps';


mongoose.connect(MONGO_URL)
    .then(() => {
        console.log(`Connected to ${MONGO_URL}`);
        // app.listen(PORT, () => {
        //     console.log(`Connected on port ${PORT}`);
        // })
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on http://0.0.0.0:${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to database:', error);
    })

