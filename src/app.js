/// <reference path="_all.d.ts" />
"use strict";
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var indexRoute = require("./routes/index");
var config = require("../config/index");
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
    };
    /**
     * Configure app
     *
     * @class Server
     * @method config
     * @return void
     */
    Server.prototype.config = function () {
        //configure jade
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "ejs");
        //mount logger
        this.app.use(logger("dev"));
        //Configuration
        this.app.set("config", config);
        //mount json form parser
        this.app.use(bodyParser.json());
        //mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.static(path.join(__dirname, "bower_components")));
        // catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    };
    return Server;
}());
var server = Server.bootstrap();
module.exports = server.app;
