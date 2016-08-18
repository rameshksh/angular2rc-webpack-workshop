// grab the things we need
import mongoose = require('mongoose');
import {IAwards} from '../models/awards';

export interface IAwardsModel extends IAwards, mongoose.Document { }
