const express = require('express');
const Router = express.Router();

// Controller
const ctrl = require('../controllers/matchesController');

// Get the played matches' index
Router.get('/', ctrl.index);

// Post a match
Router.post('/', ctrl.postMatch);

module.exports = {
  Router
}