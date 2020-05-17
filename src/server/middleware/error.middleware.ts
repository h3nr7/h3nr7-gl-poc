import HttpException from "../lib/http-exception";
import { Request, Response, NextFunction, response } from "express";

export const errorHandler = (

    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction,

) => {
    const status = error.statusCode || 500;
    const message = 
        error.message || "Unidentified error.";

    response.status(status).send(message);
};