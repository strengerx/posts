const express = require('express')
const dotenv = require('dotenv')
const ROUTER = require('./core/router')
const connectDB = require('./config/database')
const requestLogger = require('./middleware/requestLogger')
const errorLogger = require('./middleware/errorLogger')

dotenv.config()
const app = express()
const SERVER_PORT = process.env.POSTS_SERVER_PORT || 3000

app.use(express.json())

app.use(requestLogger)

app.get('/', (req, res) => {
    res.json({ msg: `Welcome to the API. Please use the /api/v1 path to access API endpoints.` })
})

app.use('/api/v1', ROUTER)

app.use((req, res, next) => {
    res.status(404).send('Sorry can\'t find that endpoints!');
});

app.use(errorLogger)

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