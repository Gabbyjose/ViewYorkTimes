const router = require('express').Router()
const request = require('request');
module.exports = router;


router.get('/mostpopular', function(req, res, next) {
  request({
    uri: 'https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json',
    qs: {
      api_key: 'e7aac6502f91491ebf2e1cb4ab25970c'
    }
  })
  .pipe(res)
});

router.get('/topstories', function(req, res, next) {
  request({
    uri: 'https://api.nytimes.com/svc/topstories/v2/home.json',
    qs: {
      api_key: 'e7aac6502f91491ebf2e1cb4ab25970c'
    }
  })
  .pipe(res)
});


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

