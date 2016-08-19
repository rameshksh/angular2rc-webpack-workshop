
import {Injectable} from '@angular/core';
import {Http, Request} from '@angular/http';
import {Movie} from '../models/Movie';
import {MovieDetail} from '../models/MovieDetail';

export interface IProxyService {
    getMovieById(id: string): Promise<Movie>;
    getImdbMovies(id: string): Promise<MovieDetail>;
    getRecentlySearchedMovies(): Promise<Array<Movie>>; 
    getMovies(sortKey: string, sortOrder: string): Promise<Array<Movie>>;
    searchImdbMovies(params: Object): Promise<Array<Movie>> ;
}

@Injectable()
export class ProxyService implements IProxyService {

    private http: Http;

    public constructor(http: Http) {
        this.http = http;
    }

    public getMovieById(id: string) : Promise<Movie> {
        var httpService = this.http;
        return new Promise<Movie>(function (resolve, reject) {
            httpService.get('http://localhost:8000/api/movies/get/' + id).subscribe(res => resolve(res.json()));
        });
    }

    public getMovies(sortKey: string, sortOrder: string): Promise<Array<Movie>> {
        var httpService = this.http;

        if (sortKey && sortOrder) {
            return new Promise<Array<Movie>>(function (resolve, reject) {
                httpService.request('http://localhost:8000/api/movies/getall?sortKey=' + sortKey + '&sortOrder=' + sortOrder).subscribe(res => resolve(res.json()));
            });
        } else {
            return new Promise<Array<Movie>>(function (resolve, reject) {
                httpService.request('http://localhost:8000/api/movies/getall').subscribe(res => resolve(res.json()));
            });
        }
    }

    public getRecentlySearchedMovies(): Promise<Array<Movie>> {
        var httpService = this.http;

        return new Promise<Array<Movie>>(function (resolve, reject) {
            httpService.request('http://localhost:8000/api/movies').subscribe(res => resolve(res.json()));
        });
    }

    public getImdbMovies(id: string): Promise<MovieDetail> {
        var httpService = this.http;
        var queryString = 'imdb=' + id;

        return new Promise<MovieDetail>(function (resolve, reject) {
            httpService.request('http://localhost:8000/api/imdb', {search : queryString }).subscribe(res => resolve(res.json()));
        });
    }

    public searchImdbMovies(params: any): Promise<Array<Movie>> {
        var httpService = this.http;
        
        var queryString = 'title=' + params.title + '&year=' + params.year + '&type=' + params.type;

        return new Promise<Array<Movie>>(function (resolve, reject) {
            httpService.request('http://localhost:8000/api/imdb/search', {search : queryString }).subscribe(res => resolve(res.json()));
        });
    }
}

