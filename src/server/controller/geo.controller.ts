/** Required External Modules and Interfaces */
import * as express from "express";
import * as GeoTiff from 'geotiff';
import { stat } from "fs";

/** Router Definition */
export const geoController = express.Router();

/** Controller Definitions */
// get self
geoController.get("/gdal", async (req: express.Request, res: express.Response) => {
    const { url, w, h } = req.query;
    try {
        // some async function
        const tiff = await GeoTiff.fromUrl(url);
        const image = await tiff.getImage();
        const metadata = await image.getGDALMetadata();
        const noData = await image.getGDALNoData();
        const imgWidth = image.getWidth();
        const imgHeight = image.getHeight();
        const tileWidth = image.getTileWidth();
        const tileHeight = image.getTileHeight();
        const geoKey = image.getGeoKeys();
        const samplesPerPixel = image.getSamplesPerPixel();
        const origin = image.getOrigin();
        const resolution = image.getResolution();
        const bbox = image.getBoundingBox();
        const rasterW = Number(w) || imgWidth;
        const rasterH = Number(h) || imgHeight;
        const raster  = await image.readRasters({ 
            width: rasterW, 
            height: rasterH, 
            // resampleMethod: 'nearest'
        });

        const { width, height } = raster;

        res.status(200).send({ 
            noData,
            width, 
            height,
            imgWidth,
            imgHeight,
            tileWidth,
            tileHeight,
            samplesPerPixel,
            origin,
            resolution,
            bbox,
            max: Math.max(...raster[0]),
            min: Math.min(...raster[0]),
            metadata,
            geoKey,
            elevations: [...raster[0]]
        });
    } catch(e) {
        res.status(404).send(e.message);
    }
});