const express = require('express');
const campsiteRouter = express.Router();

promotionRouter.route('/promotions')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send all the promotions to you');
    })
    .post((req, res) => {
        res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res) => {
        res.end('Deleting all promotions');
    });

campsiteRouter.route('/:campsiteId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    .get((req, res) => {
        res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`)
    })

    .post((req, res) => {
        res.statusCode == 403;
        res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`)
    })

    .put((req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /campsites/${req.params.campsiteId}`);
    })
    .delete((req, res) => {
        res.end(`Deleting  /campsites/${req.params.campsiteId}`);
    });


module.exports = campsiteRouter;