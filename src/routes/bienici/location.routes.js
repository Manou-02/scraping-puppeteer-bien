const express = require('express');
const { locationbienici } = require('../../controllers/bienici/location/location.controller');
const routes = express.Router();


routes.get('/location', locationbienici);

module.exports = routes;