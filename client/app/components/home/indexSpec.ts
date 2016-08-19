import {
  describe,
  expect,
  beforeEach,
  it,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import {Http, Headers, HTTP_PROVIDERS, BaseRequestOptions,
        XHRBackend, Response} from '@angular/http';
import {ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import {bind} from '@angular/core';
import {Injector, provide} from '@angular/core';

import {Review} from '../../models/review';
import {Movie} from '../../models/movie';
import {Home} from  '../../components/home/index';
import {ProxyService} from '../../services/proxyService';

    describe('Home index component:', () => {
        var component: Home,
            movieList: Array<Movie>,
            proxyService : ProxyService;

        var getTopMoviesPromise: Promise<Array<Movie>>;

        beforeEachProviders(() => {
            return [
            HTTP_PROVIDERS,
            provide(XHRBackend, {useClass: MockBackend}),
            ProxyService
            ];
        });

        beforeEach(() => {
            movieList = new Array<Movie>();

            var movie = new Movie();          
            var review = new Review();
            
            movie.year = 2005;            

            review.title = "Good Movie";
            review.description = "Must watch movie";
            review.reviewDate = "12/2/2015";           

            movieList.push(movie);        
        });
        
        beforeEach(inject([XHRBackend, ProxyService], (mockBackend, proxySvc) => {
                proxyService = proxySvc;

                component = new Home(proxyService);           

                getTopMoviesPromise = new Promise<Array<Movie>>(function (resolve, reject) { resolve(movieList) });

                spyOn(proxyService, "getTopMovies").and.returnValue(getTopMoviesPromise);
        })); 

        it("should initialize proxyService correctly", () =>
        {
            expect(proxyService).toBeDefined();
        });        

        it('should call getRecentlySearchedMovies on initialization', () => {
            component.getRecentlySearchedMovies();

            expect(proxyService.getRecentlySearchedMovies).toHaveBeenCalled();
        });

        it('should call getRecentlySearchedMovies on calling onInit function', () => {
            component.ngOnInit();

            expect(proxyService.getRecentlySearchedMovies).toHaveBeenCalled();
        });
    });