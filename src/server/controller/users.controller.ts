/** Required External Modules and Interfaces */
import * as express from "express";
import { stat } from "fs";

/** Router Definition */
export const usersController = express.Router();

/** Controller Definitions */
// get self
usersController.get("/me", async (req: express.Request, res: express.Response) => {
    try {
        // some async function
        res.status(200).send({ hello: 'World' });
    } catch(e) {
        res.status(404).send(e.message);
    }
});