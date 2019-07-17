const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: String,
  origin: String,
  yearsActive: String,
  albums: [{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}]
})

module.exports = mongoose.model('Artist', artistSchema);