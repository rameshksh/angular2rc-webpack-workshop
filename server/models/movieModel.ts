'use strict';

// grab the things we need
import mongoose = require('mongoose');
import {IMovie} from '../models/movie';

export interface IMovieModel extends IMovie, mongoose.Document { }
