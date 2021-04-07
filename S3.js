/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable func-names */
/* eslint-disable prefer-template */
const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');

const path = require('path');

const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: 'AKIAVZG2MM5AAF5B3UQV',
  secretAccessKey: '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',
  Bucket: '',
});

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.text(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

/* Single File Upload */
const imageUpload = multer({
  storage: multerS3({
    s3, // as defined above
    bucket: 'local-voice',
    acl: 'public-read',
    // eslint-disable-next-line object-shorthand
    key: function(req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname));
    }, // key: file name, access later when we get the response
  }),
  limits: { fileSize: 2000000 }, // 2MB
  // eslint-disable-next-line object-shorthand
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('profileImage');

export default router;