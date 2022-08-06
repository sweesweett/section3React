const dotenv = require('dotenv');
dotenv.config();
var express = require('express');
const axios = require('axios');
const cors = require('cors');
var app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  })
);

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
  axios.get(api_url, options).then(({ data }) => res.status(200).json(data));
  // axios
  //   .get({
  //     params: {
  //       query: uri,
  //       display: 20,
  //       start: 1,
  //       sort: 'sim',
  //     },
  //     headers: {
  //       'X-Naver-Client-Id': process.env.REACT_APP_CLIENT_ID,
  //       'X-Naver-Client-Secret': process.env.REACT_APP_CLIENT_SECRET,
  //     },
  //   })

  //   .then(({ data }) => console.log(data))
  //   .catch((err) => console.log(err));
  // //process.env.REACT_APP_CLIENT_ID
  // //process.env.REACT_APP_CLIENT_SECRET
  // console.log(result);
});
app.listen(4000, function () {
  console.log(
    'http://127.0.0.1:4000/search/blog?query=검색어 app listening on port 4000!'
  );
});
