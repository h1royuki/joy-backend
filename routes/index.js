const express = require('express');
const router = express.Router();
const parser = require('../modules/parser');
const axios = require('axios');

router.get('/page/:pageId', async function(req, res, next) {
  const page = req.params.pageId ? req.params.pageId : null;

  const json = await parser.getHomePage(page);

  res.json(json);
  res.end();
});

router.get('/tag/:tagId/:pageId', async function(req, res, next) {
  const page = req.params.pageId ? req.params.pageId : null;
  const tag = req.params.tagId ? req.params.tagId : null;

  if(!tag) {
    res.end();
  }

  const json = await parser.getTagPage(page, tag);

  res.json(json);
  res.end();
});

router.get('/user/:userId/:pageId', async function(req, res, next) {
  const page = req.params.pageId ? req.params.pageId : null;
  const user = req.params.userId ? req.params.userId : null;

  if(!user) {
    res.end();
  }


  const json = await parser.getUserPage(page, user);

  res.json(json);
  res.end();
});

router.get('/avatar/:userId', async function(req, res, next) {
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
