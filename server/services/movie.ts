/// <reference path="../../typings/index.d.ts" />

//var imdb = require('imdb-api');
//var imdb = require('imdb-node');
var omdb = require('omdb');

import {IMovie} from '../models/movie';
import Movie = require('../schemas/movie');

export interface IMovieService {
        get(id : string, callback: (errr: Error, item: any) => any) : any;
        getAll(callback: (errr: Error, item: any) => any) : any;
        getFromImdb(query : Object, callback: (errr: Error, item: any) => any) : any;
        searchFromImdb(query : Object, callback: (errr: Error, item: any) => any) : any;
        getByQuery(query: Object, callback: (errr: Error, item: any) => any) : any;
        initData(obj : Array<IMovie>, callback: (errr: Error, item: any) => any);
        create(obj : IMovie, callback: (errr: Error, item: any) => any);
        update(id: string, data : IMovie,callback: (errr: Error, item: any) => any);
        delete(id : string, callback: (errr: Error, item: any) => any);
}

var self;
export class MovieService implements IMovieService
{        
    public constructor()
    {
        self = this;        
    }

    private ValidateData(movie: IMovie) : void
    {       
            self.getByQuery({imdb : movie.imdb}, function(err, data){
                if(data && data.length < 1){                
                    self.create(movie, function(err, data){
                        if (err) throw err;
                        
                            console.log("Movie not found so added...");  
                    });
                }   
            }); 
    }

    public searchFromImdb(query : Object, callback: (errr: Error, item: any) => any) : any
    {
        
        omdb.search(query, function(err, movies) {
            if(err) {
                return console.error(err);
            }
    
            if(movies && movies.length > 0) {               
                callback(err, movies);
            }  else{
                console.log('No movies were found!');
                callback(err, []);
            }    
        });
    }

    public getFromImdb(query : any, callback: (errr: Error, item: any) => any) : any{

       omdb.get(query, true, function(err, movie) {
            if(err) {
                return console.error(err);
            }
    
            if(movie) {
                 var obj = <IMovie>{};
                 obj.imdb = movie.imdb.id;
                 obj.poster = movie.poster;
                 obj.title = movie.title;
                 obj.year = movie.year;
                 obj.type = movie.type;

                 self.ValidateData(obj);
                 
                 callback(err, movie);
            }else{
                 console.log('No movie details were found!');
                 callback(err, {});                 
            }    
        });
    }

    public get(id : string, callback: (errr: Error, item: any) => any) : any{
         Movie.findById(id, function(err, data) {
            if (err) throw err;

            callback(err, data);            
        });
    }

    public getAll(callback: (errr: Error, item: any) => any) : any {
         Movie.find({}, function(err, data) {
            if (err) throw err;

            console.log('movie found...' + data.length);

            callback(err, data);           
        }); 
    }

    public getByQuery(query: Object, callback: (errr: Error, item: any) => any) : any {
         Movie.find(query, function(err, data) {
            if (err) throw err;

            console.log('movie found...' + data.length);

            callback(err, data);           
        }); 
    }

    public initData(obj : Array<IMovie>, callback: (errr: Error, item: any) => any) {

        var insertedDocs = [];
        var error = {};
        for (var i=1; i<obj.length; ++i) {
            this.create(obj[i], function (err, item) {
                 if (err) throw err;

                insertedDocs.push(item);
            });
        }   
        callback(null, insertedDocs)     
    }

    public create(obj : IMovie, callback: (errr: Error, item: any) => any){
        var movie = new Movie(obj);
        
         movie.save(function(err, data) {
            if (err) throw err;

            console.log('movie created!');
            callback(err, data)
        });   
    }

    public update(id: string, data : IMovie,callback: (errr: Error, item: any) => any){
       
        Movie.findByIdAndUpdate(id, data , function(err, user) {
            if (err) throw err;

            // we have the updated user returned to us
           console.log('movie updated!');
            callback(err, user);
        });
    }

    public delete(id : string, callback: (errr: Error, item: any) => any){        
        Movie.findByIdAndRemove(id, function(err, movie) {
            if (err) throw err;

            // delete him
            movie.remove(function(err) {
                if (err) throw err;

                    console.log('Movie successfully deleted!');
                    callback(err, null);
                });
        });
    }
}