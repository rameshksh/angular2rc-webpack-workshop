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
import {MovieIndex} from './index';

import {Home} from  '../../components/home/index';
import {ProxyService} from '../../services/proxyService';

    describe('Home index component:', () => {
        var component: MovieIndex,
            movieList: Array<Movie>,
            proxyService: ProxyService;

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
           
            movie.title = 'xyz';
            movie.year = 2005;          

            movieList.push(movie);
        });

        beforeEach(inject([XHRBackend, ProxyService], (mockBackend, proxySvc) => {
                proxyService = proxySvc;

                component = new MovieIndex(proxyService);           

               getTopMoviesPromise = new Promise<Array<Movie>>(function (resolve, reject) { resolve(movieList) });

                spyOn(proxyService, "getMovies").and.returnValue(getTopMoviesPromise);
        }));

        it("should initialize proxyService correctly", () => {
            expect(proxyService).toBeDefined();
        });

        it('should call getMovies on initialization', () => {
            component.getMovies();

            expect(proxyService.getMovies).toHaveBeenCalled();
        });

        it('should call getMovies on calling onInit function', () => {
            component.ngOnInit();

            expect(proxyService.getMovies).toHaveBeenCalled();
        });   
       
    });