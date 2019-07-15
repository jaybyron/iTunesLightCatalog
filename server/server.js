const express = require('express');
const cors = require('cors');

const itunesApiController = require('./controllers/itunesApiController');

const PORT = 8080;
const app = express();

app.use(cors());

app.get('/search', itunesApiController.search, itunesApiController.sort, (req, res) => {
  res.json(res.locals.sorted);
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
})