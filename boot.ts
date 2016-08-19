/// <reference path="./typings/index.d.ts" />

import express = require('express');
import mongoose = require('mongoose');
import path = require('path');
import logger = require('winston');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import http = require('http');
import swig = require('swig');

import {IndexRoute} from './server/routes/index';
import {MoviesRoute} from './server/routes/movies';
import {InitialData} from './server/data/initialData';

var app = express();

    app.set('port', process.env.PORT || '8000');

    // Register our templating engine
    app.engine('html', swig.renderFile);

    app.set('view engine', 'html');
    app.set('views', __dirname + '/client');
    app.set('view cache', true);

    swig.setDefaults({ cache: false });

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
   
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '/client')));
    
    // create a write stream (in append mode) 
    logger.add(logger.transports.File, { filename: 'access.log' });
    //logger.remove(logger.transports.Console);

    logger.log('info', 'Application Started....');
    
    logger.level = 'debug';      

    http.createServer(app).listen(app.get('port'), function () {
        
        console.log("Express server listening on port " + app.get('port'));    

       mongoose.connect('mongodb://localhost:27017/moviesdb', function (err:any) {
             if(err) throw new Error('Unable to connect to mongodb');
             
            console.log("Connected to moviesdb");

            // Application routes
            var indexRoute = new IndexRoute(app);
            indexRoute.getBase();
            indexRoute.getMovies();
            indexRoute.getHome();
            indexRoute.getMoviesDetails();

            var movieRoute = new MoviesRoute(app);
                movieRoute.getRoutes();

            // database verification.
            //new InitialData().verifyData();
        });
});
