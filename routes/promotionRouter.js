const express = require('express');
const Promotion = require('../models/promotion');

const promotionRouter = express.Router();

promotionRouter.use(express.json());

promotionRouter.route('/')

    .get((req, res, next) => {
        Promotion.find()
            .then(campsites => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsites);
            })
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        Promotion.create(req.body)
            .then(campsite => {
                console.log('Campsite Created ', campsite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res, next) => {
        Promotion.deleteMany()
            .then(respose => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.json(respose);
            })
            .catch(err => next(err));
    });

promotionRouter.route('/:promotionId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end(`Will send details of the promotion: ${req.params.promotionId} to you`);
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
    })
    .put((req, res) => {
        res.write(`Updating the promotion: ${req.params.promotionId}\n`);
        res.end(`Will update the promotion: ${req.body.name}
        with description: ${req.body.description}`);
    })
    .delete((req, res) => {
        res.end(`Deleting promotion: ${req.params.promotionId}`);
    });

module.exports = promotionRouter;