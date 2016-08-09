/// <reference path="../../typings/index.d.ts" />

import {Express, Request, Response} from "express";
import {MovieService} from '../services/movie';

export class HomeController
{
    service: MovieService;

    public constructor(service: MovieService)
    {        
        this.service = service;
    }

    public getTopMovies(req: Request, res: Response)
    {        
        var query = { review: { $gt: 4,  } }

        this.service.getByQuery(query, function (err, item) {
            return res.json(item);
        });
    }
}  