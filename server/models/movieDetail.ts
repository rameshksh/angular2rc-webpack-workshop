/// <reference path="../../typings/index.d.ts" />

import {IAwards} from '../models/awards';
import {Imdb} from '../models/imdb';

export interface IMovieDetail
{    
    actors : Array<string>;
    awards: IAwards;
    countries: Array<string>;
    episode : number;
    genres: Array<string>;
    imdb: Imdb;
    metacritics:number;
    plot : string;
    poster: string;    
    rated: string;
    released: string;
    runtime: number; 
    title: string;
    type : string;    
    writers: Array<string>;
    year: number;
} 