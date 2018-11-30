const { Schema, model } = require('mongoose');

const matchSchema = new Schema({

  players: {
    type: [{
      type: Schema.Types.ObjectId,
    }],
    validate: [playersLimit, 'Not a valid players quantity'],
    required: [true, 'No players?']
  },

  tie: {
    type: Boolean,
    required: [true, 'Must say if the match result was a tie or not']
  },

  // If the match result was not a tie
  winner: {
    type: Schema.Types.ObjectId
  },

  loser: {
    type: Schema.Types.ObjectId
  }

});

function playersLimit(players) {
  return players.length === 2;
}
const Match = model('Match', matchSchema);

module.exports = {
  Match
};