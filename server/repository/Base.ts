/// <reference path="../../../typings/main.d.ts" />

import {Db, Collection, ObjectID} from 'mongodb';
import logger = require('winston');

export interface IBaseRepository<TEntity>
{
    get(id: number, callback: (err: Error, item: TEntity) => any);
    read(query: Object, callback: (err: Error, item: TEntity) => any);
    readMany(query: Object, sortKey: string, sortOrder: string, callback: (err: Error, item: Array<TEntity>) => any);
    create(data: TEntity, callback: (errr: Error, item: TEntity) => any);
    bulk(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any);
    update(id: string, data : TEntity, callback: (errr: Error, item: TEntity) => any);
    delete(id: string, callback: (errr: Error, item: TEntity) => any);
}

export class BaseRepository<TEntity> implements IBaseRepository<TEntity>
{
    db: Db;
    moviesCollection: Collection;

    constructor(database: Db)
    {
        this.db = database;
    }

    public get(id: number, callback: (err: Error, item: TEntity) => any)
    {
        this.db.open(function (err, db)
        {
            if (err) callback(err, null);

            var moviesCollection = db.collection("movies");

            moviesCollection.findOne({ "id": +id }, function (err, item)
            {
                logger.log('debug', 'reading get data..with id..' + id);
                callback(err, item);
            });
        });
    }

    public read(query: Object, callback: (err: Error, item: TEntity) => any)
    {

        this.db.open(function (err, db)
        {

            if (err) callback(err, null);

            var moviesCollection = db.collection("movies");

            moviesCollection.findOne(query, function (err, item)
            {
                logger.log('debug', 'reading single data..with query');
                callback(err, item);
            });

        });
    }

    public readMany(query: Object, sortKey: string, sortOrder: string, callback: (err: Error, item: Array<TEntity>) => any)
    {

        this.db.open(function (err, db)
        {
            if (err)
            {
                callback(err, null);
            }

            var moviesCollection = db.collection("movies");

            var options;

            if (sortKey && sortOrder)
            {
                logger.log('debug', 'reading many data..with query and sortkey, sortorder');
                options = {
                    // "limit": 20,
                    // "skip": 10,
                    "sort": [sortKey, sortOrder]
                };

                moviesCollection.find(query, options).toArray(function (err, results)
                {
                    callback(err, results);
                });
            } else if (sortKey)
            {
                logger.log('debug', 'reading many data..with query and sortkey');
                options = {
                    //  "limit": 20,
                    //  "skip": 10,
                    "sort": sortKey
                };
                moviesCollection.find(query, options).toArray(callback);
            } else
            {
                logger.log('debug', 'reading many data..with query');
                moviesCollection.find(query).toArray(callback);
            }
        });
    }

    public create(data: TEntity, callback: (errr: Error, item: TEntity) => any)
    {
        logger.log('debug', 'called create data..');

        if (data)
        {
            this.db.open(function (err, db)
            {
                if (err) callback(err, null);

                var moviesCollection = db.collection("movies");

                moviesCollection.insertOne(data, function (err, res)
                {
                    logger.log('debug', 'inserting data..');

                    callback(err, res.ops[0]);
                });
            });

        } else
        {
            callback(new Error('Empty'), null);
        }
    }

    public bulk(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any)
    {
        logger.log('debug', 'called bulk data..');

        if (data)
        {
            this.db.open(function (err, db)
            {
                if (err) callback(err, null);

                var moviesCollection = db.collection("movies");

                moviesCollection.insertMany(data, function (err, res)
                {
                    logger.log('debug', 'inserting bulk data..');

                    callback(err, res.ops);
                });
            });
        } else
        {
            callback(new Error("Empty data.."), null);
        }
    }

    public update(id: string, data : TEntity, callback: (errr: Error, item: TEntity) => any)
    {
        this.db.open(function (err, db)
        {
                var moviesCollection = db.collection("movies");

                moviesCollection.findOneAndUpdate({_id : new ObjectID(id)}, data, function (err, res)
                {
                    logger.log('debug', 'update data..');

                    callback(err, res.value);
                });
        });

    }

    public delete(id: string, callback: (errr: Error, item: TEntity) => any)
    {
        this.db.open(function (err, db)
        {
                var moviesCollection = db.collection("movies");

                moviesCollection.findOneAndDelete({_id : new ObjectID(id)}, function (err, res)
                {
                    logger.log('debug', 'delete data..');

                    callback(err, res.value);
                });
        });
    }
}