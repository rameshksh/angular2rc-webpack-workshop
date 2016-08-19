/// <reference path="../../typings/index.d.ts" />

import {Express, Request, Response} from "express";
import {MovieService} from '../services/movie';
import {IMovie} from '../models/Movie';

var self;

export module Controllers {

    export interface IMoviesController {
        createMovie();
        getMovies(req: Request, res: Response);
        getMovieDetails();
        updateMovie();
        updateMovie();
        deleteMovie();
        getImdbMovies(req: Request, res: Response);
        getRecentlyVisitedMovies(req: Request, res: Response);
    }

    export class MoviesController //implements IMoviesController
    {
        private movies: Array<IMovie>;
        private movieService: MovieService;       

        constructor() {
            self = this;
            this.movieService = new MovieService();
        }

        public getRecentlyVisitedMovies(req: Request, res: Response){
            self.movieService.getAll(function (err, item)
            {
                if(err) console.log(err);

                return res.json(item);
            });
        }

        public getImdbMovies(req: Request, res: Response)
        {
            var query = { imdb : req.query.imdb };

            self.movieService.getFromImdb(query, function (err, item)
            {
                if(err) console.log(err);

                return res.json(item);
            });
        }

        public searchImdbMovies(req: Request, res: Response)
        {
            //console.log(req);
            
            var query = { terms : req.query.title,
                          year: req.query.year, // optional 
                          type: req.query.type // optional
            };
           
            self.movieService.searchFromImdb(query, function (err, item)
            {
                if(err) console.log(err);

                return res.json(item);
            });
        }

        public createMovie() {
            //return (this.movieService.create());
        }

        public getMovies(req: Request, res: Response) {

            var sortKey = req.query.sortKey;
            var sortOrder = req.query.sortOrder;

            self.movieService.getAll(function (err, item)
            {
                if(err) console.log(err);

                return res.json(item);
            });
        }        

        public getTopMovies(req: Request, res: Response) {

            var query = { rating: { $gt: 4 } }

            self.movieService.getByQuery(query, function (err, item) {
                if (err) console.log(err);

                return res.json(item);
            });
        }

        public getMovieDetails(req: Request, res: Response) {
            var id = req.params.id;           
            
            self.movieService.get(id, function (err, item) {
                if (err) console.log(err);

                return res.json(item);
            });
        }

        public updateMovie(req: Request, res: Response) {
            var id = "";
            self.movieService.update(id, null, function (item) {
                return res.json(item);
            });
        }

        public deleteMovie(req: Request, res: Response) {
            var id = "";
            self.movieService.delete(id, function (item) {
                return res.json(item);
            });
        }
    }
}
