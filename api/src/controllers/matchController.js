const { ObjectID } = require('mongodb');

// Models
const { User } = require('../models/user');
const { Match } = require('../models/match');

module.exports = {
  
  index: async (req, res, next) => {
    const matches = await Match.find({});

    return res.status(200).json(matches);
  },

  postMatch: async (req, res, next) => {
    const match = new Match(req.body);

    match.validate(err => {
      if (err) return res.status(400).json({ flag: 'Bad Request' });

      // Tie case:
      if (match.tie) {
        // Precaution: bad filled fields
        if(match.winner) delete match.winner;
        if(match.loser) delete match.loser;
        // Attribute 1 tie point to both players && push the match Id to the matches field
        await User.findByIdAndUpdate(match.players[0], { $inc: { ties: 1 }, $push: { matches: match._id } });
        await User.findByIdAndUpdate(match.players[1], { $inc: { ties: 1 }, $push: { matches: match._id } });
      
      // Winner/Loser case:
      } else {
        // Attribute the victory to the winner and the defeat to the loser && push the match Id to the matches field
        if (!match.winner || !match.loser) return res.status(404).json({ error: 'Must have defined winner & loser' });
        await User.findByIdAndUpdate(match.winner, { $inc: { victories: 1 }, $push: { matches: match._id } });
        await User.findByIdAndUpdate(match.loser, { $inc: { defeats: 1 }, $push: { matches: match._id } });
      }
    });    
    await match.save();
    

    return res.status(201).json(match);
  }

};