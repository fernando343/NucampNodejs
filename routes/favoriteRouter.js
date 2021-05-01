const express = require('express');
const bodyParser = require('body-parser');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());


//Route 1
favoriteRouter.route('/')

    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))

    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favorite.find({ user: req.user._id })
            .populate('user')
            .populate('campsites')
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne({ user: req.user })
            .then(favorite => {
                if (favorite) {
                    req.body.forEach(fav => {
                        if (!favorite.campsites.includes(fav._id)) {
                            favorite.campsites.push(fav._id);
                        }
                    });
                    favorite.save()
                        .then(favorite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', '/application/json');
                            res.json(favorite);
                        })
                        .catch(err => next(err));
                } else {
                    Favorite.create({
                        user: req.user._id,
                        campsites: req.body
                    })
                        .then(favorite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', '/application/json');
                            res.json(favorite);
                        })
                        .catch(err => next(err));
                }
            }).catch(err => next(err));
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites')
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorite.deleteMany({ user: req.user })
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

//Route 2
favoriteRouter.route('/:campsiteId')

    .get(cors.cors, authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end(`GET operation not supported on /favorites/${req.params.campsiteId}`);
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne({ user: req.user })
            .then(favorite => {
                if (favorite) {
                    if (!favorite.campsites.includes(req.params.campsiteId)) {
                        favorite.campsites.push(req.params.campsiteId);
                        favorite.save()
                            .then(favorite => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', '/application/json');
                                res.json(favorite);
                            })
                            .catch(err => next(err));

                    } else {
                        res.statusCode = 200;
                        res.end(`That campsite with id: ${req.params.campsiteId} is already a favorite!`)
                    }


                } else {
                    Favorite.create({
                        user: req.user._id, campsites: [req.params.campsiteId]
                    })
                        .then(favorite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', '/application/json');
                            res.json(favorite);
                        })
                        .catch(err => next(err));
                }
            })
            .catch(err => next(err));
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /campsites/${req.params.campsiteId}`);
    })

    //Edit this

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne({ user: req.user._id })
            .then(favorite => {
                if (favorite) {
                    const index = favorite.campsites.findIndex(x => x._id == req.params.campsiteId);
                    console.log(index)
                    if (index >= 0) {
                        favorite.campsites.splice(index, 1);
                    }
                    favorite.save()
                        .then(favorite => {
                            console.log('Favorite Campsite Deleted');
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                            res.end(`The campsite with id ${req.params.campsiteId} is deleted`)
                        })
                        .catch(err => next(err));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', '/application/json');
                    res.json(favorite);
                }
            }).catch(err => next(err));
    });

module.exports = favoriteRouter;