const { dummydata, dummyLike } = require('./dummy');
let newDummyLike = [...dummyLike];
let newDummyData = [...dummydata];
const dotenv = require('dotenv');
dotenv.config();
var express = require('express');
const axios = require('axios');
const cors = require('cors');
var app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
    credentials: true,
  })
);
app.use(express.json());
app.get('/search/blog', function (req, res) {
  var api_url =
    'https://openapi.naver.com/v1/search/blog?query=' +
    encodeURI(req.query.query); // json 결과
  //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
  var options = {
    params: {
      display: 20,
      start: 1,
      sort: 'sim',
    },
    headers: {
      'X-Naver-Client-Id': process.env.CLIENT_ID,
      'X-Naver-Client-Secret': process.env.CLIENT_SECRET,
    },
  };
  axios
    .get(api_url, options)
    .then(({ data }) => res.status(200).json(data))
    .catch((err) => res.status(400).send(err.message));
});
app.get('/like', function (req, res) {
  return res.json(dummyLike);
});
app.post('/like', function (req, res) {
  if (dummyLike.findIndex((el) => el.title === req.body.title) === -1) {
    dummyLike.push(req.body);
  }
});
app.delete('/like/:id', function (req, res) {
  newDummyLike = newDummyLike.filter((el) => el.id !== req.params.id);
  return res.json(newDummyLike);
});
//------------------------
app.get('/todo', function (req, res) {
  return res.json(newDummyData);
});
app.post('/todo', function (req, res) {
  newDummyData = [req.body, ...newDummyData];
  return res.json(newDummyData);
});
app.put('/todo', function (req, res) {
  console.log(req.body);
  newDummyData = newDummyData.map((el) =>
    el.id === req.body.id ? { el, ...req.body } : el
  );
  return res.json(newDummyData);
});
app.delete('/todo/:id', function (req, res) {
  console.log(req.params.id);
  newDummyData = newDummyData.filter((el) => el.id != req.params.id);
  console.log(newDummyData);
  return res.json(newDummyData);
});

app.listen(4000, function () {
  console.log('app listening on port 4000!');
});
