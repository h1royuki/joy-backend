const express = require('express');
const router = express.Router();
const parser = require('../modules/parser');
const axios = require('axios');

router.get('/page/:pageId', async function(req, res, next) {
  const page = req.params.pageId ? req.params.pageId : null;

  console.log(page);
  const test = await parser.getPage(page);
  res.json(test);
  res.end();
});

router.get('/user/avatar/:userId', async function(req, res, next) {
  const userId = Number(req.params.userId) ? req.params.userId : null;

  const response = await axios.get('http://img0.joyreactor.cc/pics/avatar/user/' + userId, {
    headers: {
      'Referer': 'http://joyreactor.cc/',
    },
    responseType: 'arraybuffer'
  });

  const buffer = Buffer.from(response.data, 'base64');
  res.writeHead(200, {
    'Content-Type': response.headers['content-type'],
    'Content-Length': buffer.length
  });

  res.end(buffer);

});

router.get('/pics/post/:imageId', async function(req, res) {
  try{
    if(req.originalUrl.match(/\/pics\/.*\.(jpeg|jpg|png|gif|webm)/)) {
      const response = await axios.get('http://img1.joyreactor.cc' + req.originalUrl, {
        headers: {
          'Referer': 'http://joyreactor.cc/',
        },
        responseType: 'arraybuffer'
      });

      const buffer = Buffer.from(response.data, 'base64');
      res.writeHead(200, {
        'Content-Type': response.headers['content-type'],
        'Content-Length': buffer.length
      });

      res.end(buffer);
    } else {
      res.end();
    }
  } catch (e) {

  }
});

module.exports = router;
