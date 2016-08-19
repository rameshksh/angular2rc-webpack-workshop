/// <reference path="../../typings/index.d.ts" />

import {Express, Router, Request, Response} from 'express';
import {MovieService} from '../services/movie';
import {Controllers} from '../controllers/movie';
import logger = require('winston');

export class MoviesRoute
{
    moviesController: Controllers.MoviesController;  
    service: MovieService;  
    app: Express;

    constructor(app: Express)
    {
        this.app = app;                
        this.moviesController = new Controllers.MoviesController();
    }

    getRoutes()
    {           
        this.app.get('/api/movies', this.moviesController.getRecentlyVisitedMovies)
        this.app.get('/api/imdb', this.moviesController.getImdbMovies);

        this.app.get('/api/imdb/search', this.moviesController.searchImdbMovies);
    }
}