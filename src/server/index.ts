import * as dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import * as express from 'express';
import * as bunyan from 'bunyan';
import * as config from 'config';
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import { createApp } from './app';
import { Dependencies } from './dependency-manager';

// global settings for these using config
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const PORT:number = parseInt(process.env.PORT as string, 10);
// path for logger
const logfilePath = path.join(__dirname, '..', '..', 'logs');
const configFilePath = path.join(__dirname, '..', '..', 'config');

if(!fs.existsSync(logfilePath)) {
    fs.mkdirSync(logfilePath);
}

const firstRunFileExists = fs.existsSync(path.join(configFilePath, '.firstrun'));
let firstrun = !firstRunFileExists;
if(process.env.FIRSTRUN) {
    firstrun = JSON.parse(process.env.FIRSTRUN) as boolean;
}

// create logger
const logger = bunyan.createLogger({
    name: process.env.APP_LOGGER_NAME || 'h3nr7_default_logger',
    streams: [
        {
            level: 'info',
            path: path.join(logfilePath, 'app.log')
        }
    ]
});


// create server
const app:express.Application = createApp(logfilePath);
const server:http.Server = http.createServer(app);


// on error handler
function onError(error:NodeJS.ErrnoException):void {
    if(error.syscall !== 'listen') {
        throw error;
    }

    const bind:string = typeof PORT === 'string'
        ? 'Pipe ' + PORT
        : 'Port ' + PORT;

    // handle specific listen errors with friendly message
    switch(error.code) {
        case 'EACCESS':
            logger.error(bind + ' requires elevated privilages');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// on listening handler
function onListening():void {
    const bind:string = typeof server.address === 'string'
        ? 'Pipe ' + server.address()
        : 'Port ' + (server.address() as any).port;

    logger.info('Server is listening on ' + bind);
}

// Initialise server dependencies
Dependencies().Initialise(server, app, logger, logfilePath, firstrun).then(() => {
    server.listen(PORT);
    server.on('error', onError);
    server.on('listening', onListening);
}).catch((err:any) => {
    logger.error(err.message);
    logger.error(JSON.stringify(err));
});

