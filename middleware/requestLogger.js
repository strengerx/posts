const { v4: uuidv4 } = require('uuid');
const addLogs = require('../utilities/addLogs');

const requestLogger = (req, res, next) => {
    req.requestId = uuidv4();
    const { method, originalUrl } = req;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const logMessage = `${req.requestId}\t${method}\t${originalUrl}\t${ip}`;
    addLogs('app.log', logMessage);
    next();
};

module.exports = requestLogger