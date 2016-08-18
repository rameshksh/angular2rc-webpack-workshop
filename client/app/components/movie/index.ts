
import {Component,OnInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import { NgFor, NgIf} from '@angular/common';
import {RouteConfig, RouterLink, RootRouter} from '@angular/router-deprecated';

import {ProxyService} from '../../services/proxyService';
import {Base} from '../../base';
import {Menu} from '../../common/menu';
import {Movie} from '../../models/Movie';

@Component({
    selector: 'component-1',
    templateUrl: './index.html',
    directives: [RouterLink, NgFor, NgIf]
})

export class MovieIndex implements OnInit//extends Base
{
    private proxyService: ProxyService;
    private model : Movie;
    private movies: Array<Movie>;

    constructor(proxyService: ProxyService) {  
        //super('movies'); , public router : Router
        this.proxyService = proxyService;
        this.movies = new Array<Movie>();

        this.model = new Movie(); 
        this.model.year = 2016;
        this.model.type = 'movie';      
    }

    getMovies() {
        this.proxyService.getMovies(null, null).then((response) => {
            this.movies = response;
        });

        //this.proxyService.getMovies()
        //    .map(r => r.json())
        //    .subscribe(a => {
        //    this.movies = a;
        //});
    }

    getDetails(event, id: string) {
        window.location.href = '/movies/detail/' + id;
    }   

    onSubmit(){
        var self = this;

        this.proxyService.searchImdbMovies(this.model).then((response) => {
            self.movies = response;
        });
    }

    ngOnInit() {
        //this.getMovies();
    }
}