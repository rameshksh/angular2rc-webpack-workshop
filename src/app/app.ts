
import {Component, ComponentRef,OnInit, OnChanges, bind} from '@angular/core';
import {RouterLink, RootRouter} from '@angular/router-deprecated';
import {RouterOutlet,Router, ROUTER_DIRECTIVES , provideRouter,RouterConfig} from '@angular/router';
import {Http} from '@angular/http';
import {NgFor, NgIf, Location } from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';

import {Base} from './base';
import {Home} from './components/home/index'; 
import {About} from './components/about/index';
import {MovieIndex} from './components/movie/index';
import {MovieDetails} from './components/movie/details';

import {ProxyService} from './services/proxyService';

@Component({
    selector: 'my-app',
    templateUrl: './app.html',
    directives: [RouterOutlet, RouterLink,ROUTER_DIRECTIVES]
})

const routes: RouterConfig = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/movies/details/:id', component: MovieDetails },
  { path: '/movies', component: MovieIndex}
];

export const appRouterProviders = [
  provideRouter(routes)
];

class App //extends Base
{
     activeHomeTab: string;
     activeAboutTab: string;
     activeMoviesTab: string;

     constructor()
     {
         // Here we configure, for each route, which component should be added and its alias for URL linking
         //router
         //    .config('/', Home, 'home')
         //    .then((_) => router.config('/login', Login, 'login'))
         //    .then((_) => router.config('/login', Login, 'login'))
         //    .then((_) => router.navigate('/'))
     }  

    onInit()
    {
        this.activeHomeTab = 'active';
        this.activeAboutTab = 'inactive';
        this.activeMoviesTab = 'inactive'; 
    }

    setActiveTab(tabName: string)
    {
        this.activeHomeTab = 'inactive';
        this.activeAboutTab = 'inactive';
        this.activeMoviesTab = 'inactive';       

        switch (tabName)
        {
            case "home":
                this.activeHomeTab = 'active';
                break;
            case "about":
                this.activeAboutTab = 'active';
                break;
            case "movies":
                this.activeMoviesTab = 'active';
                break;
            default:
                this.activeHomeTab = 'active';
                break;
        }
    }
}

export const moviesInjectables = [   
    bind(ProxyService).toClass(ProxyService),
    // We only have this to mimic Angular 1's di that is limited only to string tokens. Otherwise we would use `ProxyService` class as the token
    //bind(Router).toValue(new RootRouter()),
    bind('ProxyService').toAlias(ProxyService)
];

bootstrap(App, [moviesInjectables, appRouterProviders]);
