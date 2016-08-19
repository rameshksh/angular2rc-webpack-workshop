// grab the things we need
import mongoose = require('mongoose');
import {IMovieDetail} from '../models/movieDetail';

export interface IMovieDetailModel extends IMovieDetail, mongoose.Document { }