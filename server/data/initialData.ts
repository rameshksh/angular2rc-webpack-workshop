/// <reference path="../../typings/index.d.ts" />

import {Express, Request, Response} from "express";
import logger = require('winston');
import {MovieService} from '../services/movie';
import {IMovie} from '../models/movie';
import {IReview} from '../models/review';

var self;

export class InitialData
{
    service: MovieService;
    sampleData: Array<IMovie>;

    constructor()
    {
        self = this;     
        this.service = new MovieService();
    }

    verifyData()
    {
        logger.log('debug', 'verifying movies from database..');
        var sampleData = this.getSampleData();

        this.service.getAll(function (err, items)
        { 
            if (items && (items.length > 0))
            {
                logger.log('debug', 'Initial data - Movies OK');
            } else
            {                
                self.service.initData(sampleData, function (err, result)
                {
                    if (!err)
                    {
                        logger.log('debug', 'Initial data - Movies Inserting..');
                    } else
                    {
                        logger.log('debug', err.toString());
                    }
                });
            }
        });
    }

    getSampleData(): Array<IMovie>
    {
        var list = new Array<IMovie>();
        
        var newMovie = <IMovie>{};
        var review = <IReview>{};

        newMovie.Id = 1;
        newMovie.Name = "Avtar";
        newMovie.Description = "Awesome Movie";
        newMovie.Genre = "Horror";
        newMovie.Rating = 5;
        newMovie.Year = "12/2/2005";
        newMovie.Collection = 100;
        newMovie.Language = "English";
               
        review.Title = "Good Movie";
        review.Description = "Must watch movie";
        review.ReviewDate = "12/2/2015";

        //newMovie.Reviews = new Array<IReview>();
        //newMovie.Reviews.push(review);

        list.push(newMovie);        

        var newMovie = <IMovie>{};
        var review = <IReview>{};

        newMovie.Id = 2;
        newMovie.Name = "Avtar";
        newMovie.Description = "Awesome Movie";
        newMovie.Genre = "Horror";
        newMovie.Rating = 5;
        newMovie.Year = "12/2/2005";
        newMovie.Collection = 100;
        newMovie.Language = "English";        
        review.Title = "Good Movie";
        review.Description = "Must watch movie";
        review.ReviewDate = "12/2/2015";

        //newMovie.Reviews = new Array<Review>();
        //newMovie.Reviews.push(review);

        list.push(newMovie);       

         var newMovie = <IMovie>{};
        var review = <IReview>{};

        newMovie.Id = 3;
        newMovie.Name = "Avtar";
        newMovie.Description = "Awesome Movie";
        newMovie.Genre = "Horror";
        newMovie.Rating = 5;
        newMovie.Year = "12/2/2005";
        newMovie.Collection = 100;
        newMovie.Language = "English";
               
        review.Title = "Good Movie";
        review.Description = "Must watch movie";
        review.ReviewDate = "12/2/2015";

       // newMovie.Reviews = new Array<Review>();
       // newMovie.Reviews.push(review);

        list.push(newMovie);

         var newMovie = <IMovie>{};
        var review = <IReview>{};

        newMovie.Id = 4;
        newMovie.Name = "Avtar";
        newMovie.Description = "Awesome Movie";
        newMovie.Genre = "Horror";
        newMovie.Rating = 5;
        newMovie.Year = "12/2/2005";
        newMovie.Collection = 100;
        newMovie.Language = "English";
        
        review.Title = "Good Movie";
        review.Description = "Must watch movie";
        review.ReviewDate = "12/2/2015";

        //newMovie.Reviews = new Array<Review>();
       // newMovie.Reviews.push(review);

        list.push(newMovie);       

         var newMovie = <IMovie>{};
        var review = <IReview>{};

        newMovie.Id = 5;
        newMovie.Name = "Avtar";
        newMovie.Description = "Awesome Movie";
        newMovie.Genre = "Horror";
        newMovie.Rating = 5;
        newMovie.Year = "12/2/2005";
        newMovie.Collection = 100;
        newMovie.Language = "English";        
        review.Title = "Good Movie";
        review.Description = "Must watch movie";
        review.ReviewDate = "12/2/2015";

       // newMovie.Reviews = new Array<Review>();

        //newMovie.Reviews.push(review);

        list.push(newMovie);

        return list;
    }

} 