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
         
        return list;
    }

} 