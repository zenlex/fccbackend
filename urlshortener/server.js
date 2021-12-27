const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const validator = require('validator');

// Basic Configuration
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL);
const { Schema } = mongoose;

// DB Setup
const linkSchema = new Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url: {
    type: Number
  }
});

// autoIncrement sequence
const counterSchema = new Schema({
  count: Number,
  notes: String
})

const Link = mongoose.model('Link', linkSchema);
const Counter = mongoose.model('Counter', counterSchema);

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// body parser middleware
app.use('/api/shorturl', bodyParser.urlencoded({ extended: false }));

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', async function(req, res) {
  const original_url = req.body.url;
  if (!validator.isURL(original_url)) {
    res.send({ error: 'invalid url' });
  } else {
    const newLink = await addNewLink(original_url);
    res.send(newLink);
  }
})

const addNewLink = async (url) => {
  let linkCounter = await Counter.findOne();

  if (!linkCounter) {
    linkCounter = new Counter({ count: 0 });
  }

  const newCount = linkCounter.count + 1;
  linkCounter.count = newCount;
  await linkCounter.save();
  const newLink = new Link({ original_url: url, short_url: newCount });
  await newLink.save();
  return {original_url: url, short_url: newCount};
};

const getShortUrl = async (original_url) => {
  const ret = await Link.findOne({ original_url });
  return ret;
};

//retrieve redirect
app.get('/api/shorturl/:index', async function(req, res) {
  const index = parseInt(req.params.index);
  const {original_url} = await Link.findOne({short_url:index});
 if(!original_url){
    res.send({ error: 'invalid url' });
  } else {
    res.redirect(original_url);
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
