const multipart = require('../multipartUtils');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const ID = process.env.AWS_S3_ID;
const SECRET = process.env.AWS_S3_SECRET;
const BUCKET_NAME = 'local-voice';

require('dotenv').config();

const uploadPhotos = (req, res) => {
  console.log(req);
  var photo = Buffer.alloc(0);
  req.on('data', (chunk) => {
    photo = Buffer.concat([photo, chunk]);
  }).on('end', () => {
    const newPhoto = multipart.getFile(photo);
    /*
    const fileName = 'photo.jpg';
    fs.writeFile(path.join(__dirname, '.', 'photo.jpg'), newPhoto.data, (err) => {
      if (err) {
        res.send(err);
      } else {
        const fileContent = fs.readFileSync(path.join(__dirname, '.', 'photo.jpg'));
      */
        const fileContent = newPhoto.data;
        const s3 = new AWS.S3({
          accessKeyId: ID,
          secretAccessKey: SECRET
        });
        const params = {
          Bucket: BUCKET_NAME,
          Key: `${Math.random().toString(36).slice(2)}.jpg`,
          Body: fileContent
        };

        s3.upload(params, (err, data) => {
          if (err) {
            res.send(err);
          } else {
            res.send(data.Location);
          }
        })
      }
    //})}
  )
}

module.exports = { uploadPhotos };
