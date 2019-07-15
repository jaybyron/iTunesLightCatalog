const axios = require('axios');
const url = 'https://itunes.apple.com/search?term=';
const itunesApiController = {};

itunesApiController.search = (req, res, next) => {

  if(!req.query.term) next();

  const searchString = req.query.term.replace(/\s/g, "+"); 
  axios.get(url+searchString).then((response) => {
    console.log(response.data.results[0]);
    res.locals.data = response.data;
    next();
  });
}

itunesApiController.sort = (req, res, next) => {
  const sortedData = {};
  res.locals.data.results.forEach(currentResult => {
    if(sortedData[currentResult.kind]) {
      sortedData[currentResult.kind].push(currentResult);
    } else {
      sortedData[currentResult.kind] = [currentResult];
    }
  })

  res.locals.sorted = sortedData;
  console.log('sortedData:' ,sortedData);
  return next();
}
module.exports = itunesApiController;
