const axios = require('axios');
const url = 'https://itunes.apple.com/search?term=';
const itunesApiController = {};

itunesApiController.search = (req, res, next) => {

  if(!req.query.term || req.query.term.length === 0) {
    const err = new Error('No Search Terms Inputted');
    err.status = 400;
    err.location = 'Search';
    next(err);
  }

  const searchString = req.query.term.replace(/\s/g, "+"); 
  axios.get(url+searchString).then((response) => {
    res.locals.data = response.data;
    return next();
  });
}

itunesApiController.sort = (req, res, next) => {
  const sortedData = {};
  const createDataObj = (result) => {
    const currentData = {};
    currentData.id = result.trackId;
    currentData.name = result.artistName;
    currentData.trackName = result.trackName;
    currentData.url = result.trackViewUrl;
    currentData.genre = result.primaryGenreName;
    currentData.art = result.artworkUrl100;
    return currentData;
  }

  res.locals.data.results.forEach(currentResult => {
    if(sortedData[currentResult.kind]) {
      sortedData[currentResult.kind].push(createDataObj(currentResult));
    } else {
      /* there are some cases where the API returns a search result without a kind key.
         we shall ignore those since those aren't part of the spec */
      if(currentResult.kind) {
        sortedData[currentResult.kind] = [createDataObj(currentResult)];
      }
    }
  });

  res.locals.sorted = sortedData;
  return next();
}
module.exports = itunesApiController;
