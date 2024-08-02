const express = require('express')
const dotenv = require('dotenv')
const ROUTER = require('./core/router')
const connectDB = require('./config/database')

dotenv.config()
const app = express()
const SERVER_PORT = process.env.POSTS_SERVER_PORT || 3000

app.use(express.json())

app.use('/api/v1/posts', ROUTER)

const startServer = () => {
    app.listen(SERVER_PORT, () => console.log(`server is running on port: ${SERVER_PORT}`))
}

const initializeApp = async () => {
    try {
        await connectDB();
        startServer();
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
};

initializeApp();