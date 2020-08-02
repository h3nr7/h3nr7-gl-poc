import * as path from 'path';
import * as express from 'express';
import * as favicon from 'serve-favicon';

import { viewController } from '../controller/view.controller';
import { usersController } from '../controller/users.controller';
import { errorHandler } from '../middleware/error.middleware';
import { notFoundHandler } from '../middleware/not-found.middleware';
import { geoController } from './geo.controller';

export function registerRoutes(app:express.Application):void {

    app.use(favicon(path.join(__dirname, "..", "..", "..", "public", "favicon-32x32.png")));
    app.use('/static', express.static(path.resolve(__dirname, '..','..', '..', 'public')))

    //add api controller routes here
    app.use('/api/users', usersController);
    app.use('/api/geo', geoController);
    app.use('/api', errorHandler);
    app.use('/api', notFoundHandler);

    // add view controller routes here
    app.use('/', viewController);

}

