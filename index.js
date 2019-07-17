const express = require('express');
const mongoose = require('mongoose');
const Artist = require('./models/artist');
const Album = require('./models/album');

const app = express();

app.use(express.urlencoded({extended: false}));

//Connect to Mongo!
mongoose.connect('mongodb://localhost/nme-backend');

//Default route
app.get('/', (req, res) => {
  res.send("Hello, it seems to work!");
})

// GET /artists -- get ALL artists
app.get('/artists', (req, res) => {
  Artist.find({}, function(err, artists) {
    if (err) res.json(err)
    res.json(artists)
  })
})

// GET /artists/:id -- get ONE artist
app.get('/artists/:id', (req, res) => {
  Artist.findById(req.params.id).populate('albums').exec(function(err, artist) {
    if(err) res.json(err)
    res.json(artist);
  })
})

// POST /artists -- create new artist
app.post('/artists', (req, res) => {
  Artist.create({
    name: req.body.name,
    origin: req.body.origin,
    yearsActive: req.body.yearsActive//,
    //albums: 
  },
    function(err, artist) {
      if (err) res.json(err)
      res.json(artist)
    }
  )
})

//PUT /artists/:id -- update an artist
app.put('/artists/:id', (req, res) => {
  Artist.findByIdAndUpdate(
    req.params.id, 
    { $set: {name: req.body.name,
      origin: req.body.origin,
      yearsActive: req.body.yearsActive//,
      //albums: req.body.albums
    }}, 
    {new: true}, 
    function (err, artist) {
      if (eff) res.json(err)
      res.json(artist)
  }) 
})

// DELETE /artists/:id -- delete an artist
app.delete('/artists/:id', (req, res) => {
  Artist.findByIdAndDelete(
    req.params.id,
    function(err) {
      if (err) res.json(err)
      res.json({message: "DELETED!"})
  })
})

//GET /albums -- get ALL albums
// app.get('/albums', (req, res) => {
//   Album.find({}, function(err, albums) {
//     if (err) res.json(err)
//     res.json(albums)
//   })
// })

// GET /albums/:id -- display individual album
// app.get('/albums/:id', (req, res) => {
//   Album.findById(req.params.id).populate('artist').exec(function(err, album) {
//     if (err) res.json(err)
//     res.json(album)
//   })
// })

// DELETE /albums/:id -- delete an album
// app.delete('/albums/:id', (req, res) => {
//   Album.findByIdAndDelete(
//     req.params.id,
//     function(err) {
//       if (err) res.json(err)
//       res.json({message: "DELETED!"})
//   })
// })

// POST /artists/:id/albums -- creates new album
app.post('/artists/:id/albums', (req, res) => {
  Artist.findById(req.params.id, function(err, artist) {
    artist.albums.push({  name: req.body.name, 
                          released: req.body.released,
                          length: req.body.length,
                          genre: req.body.genre,
                          producer: req.body.producer,
                          artist: req.params.id
    })
    artist.save(function(err, artist) {
      if (err) res.json(err)
      res.json(artist)
    })
  })
})



app.listen(3001, () => {
  console.log("🎸🎸🎸🎸🎸🎸🎸... listening on 3000... 🎸🎸🎸🎸🎸🎸🎸 ");
})