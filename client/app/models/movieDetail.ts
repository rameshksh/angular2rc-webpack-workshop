import {Awards} from '../../app/models/awards';
import {Imdb} from '../../app/models/imdb';

export class MovieDetail
{
    public id: number;
    public actors : Array<string>;
    public awards: Awards;
    public countries: Array<string>;
    public episode : number;
    public genres: Array<string>;
    public imdb: Imdb;
    public metacritics:number;
    public plot : string;
    public poster: string;    
    public rated: string;
    public released: string;
    public runtime: number; 
    public title: string;
    public type : string;    
    public writers: Array<string>;
    public year: number;

    constructor(){
        this.awards = new Awards();
        this.imdb = new Imdb();
    }
} 