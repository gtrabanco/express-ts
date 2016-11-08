/// <reference path="_all.d.ts" />

"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as indexRoute from "./routes/index";

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //configure routes
        this.routes();
    }

    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    private routes():void {
        //get router
        let router: express.Router;
        router = express.Router();

        //create routes
        var index: indexRoute.Index = new indexRoute.Index();

        //home page
        router.get("/", index.index.bind(index.index));

        //use router middleware
        this.app.use(router);

        /*
         // view engine setup
         app.set('views', path.join(__dirname, 'views'));
         app.set('view engine', 'ejs');
         */
    }


    /**
     * Configure app
     *
     * @class Server
     * @method config
     * @return void
     */
    private config():void {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('views engine', npm_package_config_view_engine)
    }


}