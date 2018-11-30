const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

// Model
const { User } = require('../models/user');

module.exports = {

  // Get user's index
  index: async (req, res, next) => {
    const users = await User.find({});

    return res.status(200).json(users);
  },
  
  // Post user
  postUser: async (req, res, next) => {
    const user = new User(req.body);
    
    try {
      await user.save();
    } catch (error) {
      return res.status(400).json({ flag: 'Error at saving', error: error });
    }

    return res.status(201).json(user);
  },

  // Get user
  getUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      if (!ObjectID.isValid(userId)) throw new Error({ flag: 'User Id is not valid', error: 'INVALID_ID' });
      
      const user = User.findById(userId);

      if (!user) throw new Error({ flag: 'User is null', error: 'NULL_USER' });
    
      return res.status(200).json(user);
    } catch (error) {

      return res.status(404).json(error);
    }
  },

  // PATCH: User Victories/Ties/Defeats
  /**
   * Structure:
   * {
   *  <field>: ${victories||ties||defeats}, // The field you want to update
   * }
   */
  patchMatch: async (req, res, next) => {
    // TODO
    try {
      // User Id
      const { userId } = req.params;
      if (!ObjectID.isValid(userId)) throw new Error({ flag: 'User Id is not valid', error: 'INVALID_ID' });
      
      // Update data
      const { field } = req.body;
      if (field != 'victories' || 'ties' || 'defeats'); // No funca xd

      // object.prop === object[prop]

      let field = await User.findById(userId)[field];
      // Sums +1 to the field beacuse there is always going to be only 1 match which sums to the total matches.
      field++

      await User.findByIdAndUpdate(userId, field);

      return res.status(201).json(field);
    } catch (error) {
      
      res.status(404).json(error);
    }
  }

  // GET: Ranking 
  
};