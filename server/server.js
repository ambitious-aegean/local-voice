const express = require('express');

const app = express();
const port = 3000;
const path = require('path');
const router = require('./routes/routes.js');
const dotenv = require('dotenv').config();
const multipart = require('./multipartUtils');
const fs = require('fs');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

app.use('/', router);

app.get('/test', (req, res) => {
  res.send('test');
});

app.post('/photo', (req, res) => {
  var photo = Buffer.alloc(0);
  req.on('data', (chunk) => {
    photo = Buffer.concat([photo, chunk]);
  }).on('end', () => {
    const newPhoto = multipart.getFile(photo);
    fs.writeFile(path.join(__dirname, '.', 'photo.jpg'), newPhoto.data, (err) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    })
  })
});


const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = {
  server,
  app,
};
