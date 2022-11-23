import config from '../config/index';

import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

// If the server runs in production, show only warn and error messages.
const level = () => {
    const env = config.node_env || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}


// Add color based on the log level
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}
winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
)

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
        ),
    }),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        options: { flags: 'a+', encoding: 'utf8', mode: 0o644 }
    }),
    new winston.transports.File({
        filename: 'logs/all.log',
        options: { flags: 'a+', encoding: 'utf8', mode: 0o644 },
        tailable: true,
        maxsize: 5000,
        maxFiles: 3,
        zippedArchive: true
    }),
]

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})

export default Logger