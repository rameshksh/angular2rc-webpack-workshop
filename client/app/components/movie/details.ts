import {Component,OnInit, OnChanges, Optional} from '@angular/core';
//import {RouteConfig, RouterLink, RootRouter, RouteSegment} from '@angular/router-deprecated';
import {RouterLink, ActivatedRoute} from '@angular/router';
import {NgFor, NgIf} from '@angular/common';

import {ProxyService} from '../../services/proxyService';
import {Base} from '../../base';
import {MovieDetail} from '../../models/MovieDetail';

@Component({
    selector: 'component-1',
    templateUrl: './details.html',
    directives: [RouterLink, NgFor, NgIf]
})

export class MovieDetails implements OnInit//extends Base
{
    private proxyService: ProxyService;
    private movie: MovieDetail;
    private route : ActivatedRoute;

    constructor(proxyService: ProxyService, @Optional() route: ActivatedRoute)
    {  
        //super('movies');
        this.route = route;
        this.proxyService = proxyService; 
        this.movie = new MovieDetail(); 
    }

    getMovieDetails()
    {       
      
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.proxyService.getImdbMovies(id).then((response) =>
                {           
                    this.movie = response;
                });
        });
    }

    ngOnInit()
    {
        this.getMovieDetails();
    }   
}