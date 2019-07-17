const express = require('express');
const cors = require('cors');

const itunesApiController = require('./controllers/itunesApiController');

const PORT = 8080;
const app = express();

app.use(cors());

app.use(express.static('../client/build'));

app.get('/search', itunesApiController.search, itunesApiController.sort, (req, res) => {
  res.json(res.locals.sorted);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  err.location = 'Route Handler';
  next(err);
});

app.use(function (err, req, res, next) {
  // set locals, exclusing error if in production
  res.locals.message = err.message;

  // server-log error details
  console.log(`ERROR: next error returned from ${err.location}`);
  console.error(`ERROR DETAILS: `, typeof err === 'object' ? JSON.stringify(err) : err);

  // close request with error response
  return res.status(err.status || 500).json({ 
    success: false,
    error: {
      message: err.message,
      error: err,
    }
  });
});


app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
})