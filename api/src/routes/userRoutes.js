const express = require('express');
const Router = express.Router();

// Controller
const ctrl = require('../controllers/userController');

// Get user's index
Router.get('/', ctrl.index);

// Post user
Router.post('/', ctrl.postUser);

// Get user
Router.get('/:userId/details', ctrl.getUser);

// Update user personal info
Router.put('/:userId', ctrl.putUserInfo);

// Get users ranking
Router.get('/ranking', ctrl.getRanking);

// Get user's played matches
Router.get('/:userId/matches', ctrl.getUserMatches);

module.exports = {
  Router
}