const express = require('express');
const Router = express.Router();

// Controller
const ctrl = require('../controllers/userController');

// Get index
Router.get('/', ctrl.index);

// Post user
Router.post('/', ctrl.postUser);


module.exports = {
  Router
}