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
    if(err) res.status(500).json(err)
    res.status(200).json(artist);
  })
})

// POST /artists -- create new artist
app.post('/artists', (req, res) => {
  let artist = new Artist({ //----> can also use something like that instead of code below
    name: req.body.name,
    origin: req.body.origin,
    yearsActive: req.body.yearsActive
  });
  artist.save((err, queen) => {
    res.json(queen)
  })
//   Artist.create({
//     name: req.body.name,
//     origin: req.body.origin,
//     yearsActive: req.body.yearsActive 
//   },
//     function(err, artist) {
//       if (err) res.json(err)
//       res.json(artist)
//     }
//   )
})

//PUT /artists/:id -- update one artist
app.put('/artists/:id', (req, res) => {

  Artist.findByIdAndUpdate(
    req.params.id, 
    { name: req.body.name,
      origin: req.body.origin,
      yearsActive: req.body.yearsActive//,
      //albums: req.body.albums
    }, 
    {new: true}, 
    (err, artist) => {
      if (err) res.json(err)
      res.status(203).json(artist)
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

//GET /artists/:arid/albums -- get albums for one artist
app.get('/artists/:id/albums', (req, res) => {
  Artist.findById(req.params.id).populate('albums').exec((err, queen) => {
    if (err) res.json(err)
    res.json(queen)
  }) 
})

//GET /artists/:arid/albums/:alid
app.get('/artists/:arid/albums/:alid', (req, res) => {
  Album.findById(req.params.alid, (err, album) => {
    if (err) res.json(err)
    res.json(album)
  })
})

//POST /artists/:arid/albums -- creates new album
app.post('/artists/:id/albums', (req, res) =>{
  Artist.findById(req.params.id, function(err, artist) {
    Album.create({
      name: req.body.name, 
      released: req.body.released,
      length: req.body.length,
      genre: req.body.genre,
      producer: req.body.producer,
      artist: req.params.id
      }, function(err,album){
          artist.albums.push(album)
          artist.save(function(err, artist){
            if (err) res.json(err)
            res.json(artist)
      })
    })
  })
})

//DELETE /artists/:arid/albums/:alid -- detete one album from one artist
app.delete('/artists/:arid/albums/:alid', (req, res) => {
  Artist.findById(req.params.arid, (err, artist) => {
    artist.albums.pull(req.params.alid)
    artist.save(err => {
      if (err) res.json(err)
      Album.deleteOne({_id: req.params.alid}, err => {
        if (err) res.json(err)
        res.json(1)
      })
    })
  })
})


app.listen(3001, () => {
  console.log("🎸🎸🎸🎸🎸🎸🎸... listening on 3000... 🎸🎸🎸🎸🎸🎸🎸 ");
})