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
import {MovieDetails} from './details';

import {Home} from  '../../components/home/index';
import {ProxyService} from '../../services/proxyService';


    describe('Home index component:', () => {
        var component: MovieDetails,
            movie : Movie,            
            proxyService: ProxyService;

        var getMovieByIdPromise: Promise<Movie>;

        beforeEachProviders(() => {
            return [
            HTTP_PROVIDERS,
            provide(XHRBackend, {useClass: MockBackend}),
            ProxyService
            ];
        });

        beforeEach(() => {       
            movie = new Movie();

           
            movie.year = 2005;           
        });

       beforeEach(inject([XHRBackend, ProxyService], (mockBackend, proxySvc) => {
                proxyService = proxySvc;

                component = new MovieDetails(proxyService,null);           

               getMovieByIdPromise = new Promise<Movie>(function (resolve, reject) { resolve(movie) });

                spyOn(proxyService, "getMovieById").and.returnValue(getMovieByIdPromise);
        })); 

        it("should initialize proxyService correctly", () => {
            expect(proxyService).toBeDefined();
        });

        it('should call getTopMovies on initialization', () => {
            component.getMovieDetails();

            expect(proxyService.getMovieById).toHaveBeenCalled();
        });

        it('should call getTopMovies on calling onInit function', () => {
            component.ngOnInit();

            expect(proxyService.getMovieById).toHaveBeenCalled();
        });
    });