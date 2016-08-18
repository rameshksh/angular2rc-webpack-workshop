// grab the things we need
import mongoose = require('mongoose');
import {Imdb} from '../models/imdb';

export interface ImdbModel extends Imdb, mongoose.Document { }
