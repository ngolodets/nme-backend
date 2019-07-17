const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  name: String,
  released: Date,
  length: String,
  genre: String,
  producer: String,
  artist: {type: mongoose.Schema.Types.ObjectId, ref: 'Artist'}
})

module.exports = mongoose.model('Album', albumSchema);