const express = require('express');
const Router = express.Router();

// Controller
const ctrl = require('../controllers/userController');

// Get user's index
Router.get('/', ctrl.index);

// Post user
Router.post('/', ctrl.postUser);

// Get a user
Router.get('/userId', ctrl.getUser);


module.exports = {
  Router
}