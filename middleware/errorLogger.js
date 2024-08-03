const addLogs = require("../utilities/addLogs");

const errorLogger = (err, req, res, next) => {
    const { method, originalUrl } = req;
    const logMessage = `${req.requestId || 'N/A'}\t${err.message}\t${method}\t${originalUrl}`;
    addLogs('error.log', logMessage);
    res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorLogger