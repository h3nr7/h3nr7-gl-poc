import * as express from 'express';
import * as bunyan from "bunyan";
import * as http from "http";

class DependencyManager {
    public Initialise = async (server: http.Server,
                               app: express.Application,
                               logger: bunyan,
                               logFilePath: string,
                               firstRun: boolean) => {
        // TODO: Manage dependencies in here
        // such as databases and other services.
    }
}

const dependencyManager: DependencyManager =  new DependencyManager();

// Only ever have one dependency manager
export function Dependencies() {
    return dependencyManager;
}