'use strict';
/// <reference path="../../typings/index.d.ts" />

// grab the things we need
import mongoose = require('mongoose');
import {IMovieModel} from '../models/movieModel';

// create a schema
var movieSchema = new mongoose.Schema({ 
    name: String,
    description: String,
    collections: Number,
    genre: String,
    language: String,   
    year: String,
    type: String,
    rating: Number
});

// the schema is useless so far
// we need to create a model using it
var Movie = mongoose.model<IMovieModel>('Movie', movieSchema);

// make this available to our users in our Node applications
export = Movie;
