'use strict';

// grab the things we need
import mongoose = require('mongoose');
import {IReview} from '../models/review';

export interface IReviewModel extends IReview, mongoose.Document { }
