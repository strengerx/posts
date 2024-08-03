const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const MONGODB_URL = process.env.MONGODB_ACCESS_URL

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log('MongoDB Connected...')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB;