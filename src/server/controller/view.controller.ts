import * as express from 'express';
import * as path from 'path';
import * as loadjsonfile from "load-json-file";


export const viewController = express.Router();

const isDevMode = process.env.NODE_ENV === "development" || false;
const isProdMode = process.env.NODE_ENV === "production" || false;

let webpackManifest: any = {};
if (isProdMode) {
    webpackManifest = loadjsonfile.sync(path.resolve(__dirname, "..", "..", "dist", "manifest.json"));
}

// default views
viewController.use((req: express.Request, res: express.Response) => {
    const vendorsJSUrl:string = isProdMode ? webpackManifest["vendors.js"] : '/dist/vendors.bundle.js';
    const bundleJSUrl:string = isProdMode ? webpackManifest["main.js"] : '/dist/bundle.js';
    const title:string = 'Some title here';
    const fbId:string = '1234567';
    const og = {
        title,
        desc: 'some desc',
        image: 'some image',
        type: 'some type'
    };
    
    res.render('home', { 
        layout: 'default',
        title,
        fbId,
        og,
        vendorsJSUrl,
        bundleJSUrl
    });
});

