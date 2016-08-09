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
        this.app.get('/api/movies/getall', this.moviesController.getMovies);
        this.app.get('/api/movies/gettop', this.moviesController.getTopMovies);
        this.app.get('/api/movies/get/:id', this.moviesController.getMovieDetails)
    }
}