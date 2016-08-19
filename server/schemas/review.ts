'use strict';
/// <reference path="../../typings/index.d.ts" />

// grab the things we need
import mongoose = require('mongoose');
import {IReviewModel} from '../models/reviewModel';

// create a schema
var reviewSchema = new mongoose.Schema({
     title: String,
     description: String,
     reviewDate: String
});

// the schema is useless so far
// we need to create a model using it
var Review = mongoose.model<IReviewModel>('Review', reviewSchema);

// make this available to our users in our Node applications
export = Review;