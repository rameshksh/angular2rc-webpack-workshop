import {Component, ProviderBuilder, OnInit, OnChanges, Injector,Injectable} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {RouteConfig, RouterLink, RootRouter} from '@angular/router-deprecated';
import { FormBuilder, ControlGroup, NgModel, NgFor, NgIf, NgControl } from '@angular/common';
import {Http,} from '@angular/http';

import {Validators, } from '@angular/common';
import {ProxyService} from '../../services/proxyService';
import {Movie} from '../../models/Movie';

import {Base} from '../../base';


@Component({
    selector: 'component-1',
    templateUrl: './index.html',
    directives: [RouterLink, NgFor, NgIf]
})

export class Home implements OnInit //extends Base 
{
    private proxyService: ProxyService;
    private movies: Array<Movie>;

    constructor(proxyService: ProxyService)
    {
        //, public router: Router
        //super('home');
        this.proxyService = proxyService;
        this.movies = new Array<Movie>();
    }

    getRecentlySearchedMovies() {
        this.proxyService.getRecentlySearchedMovies().then((response) => {
            this.movies = response;
        });     
    }

    getDetails(event, id)
    {
       //this.router.parent.navigate('/movies/detail/' + id);
    }

    ngOnInit() {
        this.getRecentlySearchedMovies();
    }
}