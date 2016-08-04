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

export class Home //extends Base 
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

    getTopMovies() {
        this.proxyService.getTopMovies().then((response) => {
            this.movies = response;
        });

        //this.proxyService.getMovies()
        //    .map(r => r.json())
        //    .subscribe(a => {
        //    this.movies = a;
        //});
    }

    getDetails(event, id)
    {
       // this.router.parent.navigate('/movies/detail/' + id);
    }

    onInit() {
        this.getTopMovies();
    }

    onChange() {
        this.getTopMovies();
    }
}