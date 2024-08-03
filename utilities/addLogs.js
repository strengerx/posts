const path = require('path')
const fs = require('fs')

const ensureDirectoryExists = (filePath) => {
    const dir = path.dirname(path.join(__dirname, '..', 'logs', filePath));
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const addLogs = (filePath, message) => {
    ensureDirectoryExists(filePath);
    const logPath = path.join(__dirname, '..', 'logs', filePath);
    const logMessage = `${new Date().toISOString()}\t${message}\n`;
    fs.appendFileSync(logPath, logMessage, (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
};

module.exports = addLogs