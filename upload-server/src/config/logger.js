const path = require("path");
const winston = require("winston");

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: process.env.LOG_LEVEL_FILE,
    filename: path.join(__dirname, "..", "..", "app.log"),
    // vagy:
    // filename: path.join(__dirname, '../../app.log'),

    format: winston.format.json(),
  },
  console: {
    level: process.env.LOG_LEVEL_CONSOLE,
  },
};

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;