/// <reference path="../../typings/index.d.ts" />

//var imdb = require('imdb-api');
var imdb = require('imdb-node');

import {IMovie} from '../models/movie';
import Movie = require('../schemas/movie');

export interface IMovieService {
        get(id : string, callback: (errr: Error, item: any) => any) : any;
        getAll(callback: (errr: Error, item: any) => any) : any;
        getFromImdb(query : Object, callback: (errr: Error, item: any) => any) : any;
        getByQuery(query: Object, callback: (errr: Error, item: any) => any) : any;
        initData(obj : Array<IMovie>, callback: (errr: Error, item: any) => any);
        create(obj : IMovie, callback: (errr: Error, item: any) => any);
        update(id: string, data : IMovie,callback: (errr: Error, item: any) => any);
        delete(id : string, callback: (errr: Error, item: any) => any);
}

export class MovieService implements IMovieService
{        
    public constructor()
    {
        
    }

    public getFromImdb(query : Object, callback: (errr: Error, item: any) => any) : any{
       
        imdb('http://www.imdb.com/title/tt3450900', function(resultData) {
            console.log(resultData);

            callback(null, resultData);
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
 