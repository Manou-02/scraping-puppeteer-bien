// import { getLocationAppartementParis } from '../../controllers/locations/appartement.controller';
const { getLocationAppartementParis } = require('../../controllers/locations/appartement.controller');


const express = require('express');
const routes = express.Router();

routes.get('/location-appartement-paris', getLocationAppartementParis);


module.exports =  routes;