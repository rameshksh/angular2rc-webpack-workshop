/// <reference path="../../typings/index.d.ts" />

import {Component, ComponentRef,OnInit, OnChanges, bind} from '@angular/core';
import {RouterOutlet,Router, ROUTER_DIRECTIVES , provideRouter,RouterConfig} from '@angular/router';
import {NgFor, NgIf, Location } from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';

import {Base} from './base';
import {Home} from './components/home/index'; 
import {About} from './components/about/index';
import {MovieIndex} from './components/movie/index';
import {MovieDetails} from './components/movie/details';

import {ProxyService} from './services/proxyService';

import './less/app.less';

@Component({
    selector: 'my-app',
    templateUrl: './app.html', 
    directives: [RouterOutlet, ROUTER_DIRECTIVES]
})

export class AppComponent //extends Base
{
     isHomeTabActive: boolean;
     isAboutTabActive: boolean;
     isMovieTabActive: boolean;

     constructor()
     {
         
     }  

    onInit()
    {
        this.isHomeTabActive = false;
        this.isAboutTabActive = false;
        this.isMovieTabActive = false; 
    }

    setActiveTab(tabName: string)
    {
         this.onInit();     

        switch (tabName)
        {
            case "home":
                this.isHomeTabActive = true;
                break;
            case "about":
                this.isAboutTabActive = true;
                break;
            case "movies":
                this.isMovieTabActive = true;
                break;
            default:
                this.isHomeTabActive = true;
                break;
        }
    }
}

export const routes: RouterConfig = [  
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'movies/:id', component: MovieDetails },
  { path: 'movies', component: MovieIndex}
];

export const appRouterProviders = [
  provideRouter(routes)
];

export const moviesInjectables = [   
    bind(ProxyService).toClass(ProxyService),
    // We only have this to mimic Angular 1's di that is limited only to string tokens. Otherwise we would use `ProxyService` class as the token
    //bind(Router).toValue(new RootRouter()),
    bind('ProxyService').toAlias(ProxyService)
];