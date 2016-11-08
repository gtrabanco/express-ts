/// <reference path="_all.d.ts" />
"use strict";
var express = require("express");
var path = require("path");
var indexRoute = require("./routes/index");
/**
 * The server.
 *
 * @class Server
 */
var Server = (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function Server() {
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        //configure routes
        this.routes();
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    Server.prototype.routes = function () {
        //get router
        var router;
        router = express.Router();
        //create routes
        var index = new indexRoute.Index();
        //home page
        router.get("/", index.index.bind(index.index));
        //use router middleware
        this.app.use(router);
        /*
         // view engine setup
         app.set('views', path.join(__dirname, 'views'));
         app.set('view engine', 'ejs');
         */
    };
    /**
     * Configure app
     *
     * @class Server
     * @method config
     * @return void
     */
    Server.prototype.config = function () {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('views engine', npm_package_config_view_engine);
    };
    return Server;
}());
//# sourceMappingURL=app.js.map