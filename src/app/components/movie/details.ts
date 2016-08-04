import {Component,OnInit, OnChanges} from '@angular/core';
import {RouteConfig, RouterLink, RootRouter} from '@angular/router-deprecated';
import {NgFor, NgIf} from '@angular/common';

import {ProxyService} from '../../services/proxyService';
import {Base} from '../../base';
import {Movie} from '../../models/movie';

@Component({
    selector: 'component-1',
    templateUrl: './details.html',
    directives: [RouterLink, NgFor, NgIf]
})

export class MovieDetails //extends Base
{
    private proxyService: ProxyService;
    private movie: Movie;

    constructor(proxyService: ProxyService)
    {  
        //super('movies');
        this.proxyService = proxyService; 
        this.movie = new Movie();     
    }

    getMovieDetails()
    {
        var id = "12";

        this.proxyService.getMovieById(id).then((response) =>
        {           
            this.movie = response;
        });

        //this.proxyService.getMovies()
        //    .map(r => r.json())
        //    .subscribe(a => {
        //    this.movies = a;
        //});
    }

    onInit()
    {
        this.getMovieDetails();
    }

    onChange()
    {
        this.getMovieDetails();
    }
}