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
            var review = new Review();

            movie.Id = 1;
            movie.Name = "Avtar";
            movie.Description = "Awesome Movie";
            movie.Genre = "Horror";
            movie.Rating = 5;
            movie.Year = "12/2/2005";
            movie.Collection = 100;
            movie.Language = "English";

            review.Title = "Good Movie";
            review.Description = "Must watch movie";
            review.ReviewDate = "12/2/2015";

            movie.Reviews = new Array<Review>();
            movie.Reviews.push(review);

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

        it('should call getMovies on calling getByFilters when both params are not passed', () => {
            component.getByFilters('sdfd', 'sdf');

            expect(proxyService.getMovies).toHaveBeenCalled();
        });

        it('should not call getMovies on calling getByFilters when params are not passed', () => {
            component.getByFilters('','');

            expect(proxyService.getMovies).not.toHaveBeenCalled();
        });

        it('should not call getMovies on calling getByFilters when either params are not passed', () => {
            component.getByFilters('df', '');

            expect(proxyService.getMovies).not.toHaveBeenCalled();
        });

        it('should not call getMovies on calling getByFilters when either params are not passed', () => {
            component.getByFilters('', 'sdf');

            expect(proxyService.getMovies).not.toHaveBeenCalled();
        });
    });