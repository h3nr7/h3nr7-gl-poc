import * as config from 'config';
import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as handlebars from 'express-handlebars';

import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpackConfig from '../webpack/webpack.config.dev';
import { registerRoutes } from './controller/index';


const isDevMode: boolean = process.env.NODE_ENV === "development" || false;
const isProdMode: boolean = process.env.NODE_ENV === "production" || false;

export function createApp(logfilePath: string):express.Application {

    // init app
    const app:express.Application = express();
	// logger streams
	const accessLogFilename: string = config.get("Logfiles.AccessFilename");
	const accessLogStream: fs.WriteStream = fs.createWriteStream(path.join(logfilePath, accessLogFilename), { flags: "a" });

	// dev mode webpack compiler
	if(isDevMode) {
		const compiler: webpack.ICompiler = webpack(webpackConfig as webpack.Configuration);
		app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }));
		app.use(webpackHotMiddleware(compiler));
	}
    
    // prod mode built static resources
	app.use("/public", express.static(path.join(__dirname, "..", "..", "public")));
	if(isProdMode) {
		app.use("/dist", express.static(path.join(__dirname, "..", "dist")));
    }
    
    // app use
	app.use(compression());
	app.use(helmet());
	app.use(cors());
	app.use(bodyParser.json());
	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: true }));
	// set up handlebars
	app.engine('.hbs', handlebars({
		layoutsDir: path.join(__dirname, '..', '..', 'views', 'layouts'),
		partialsDir: path.join(__dirname, '..', '..', 'views', 'partials'),
		defaultLayout: 'default',
		extname: '.hbs'
	}));
	app.set('view engine', '.hbs');
	
    // use controller routes
    registerRoutes(app);

    return app;
};