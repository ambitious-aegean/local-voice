const db = require('../../db/index.js');

const postIssue = (req, res) => {
  const {
      categories,
      title,
      text,
      lat,
      lng,
      photos,
      rep_name,
    //   rep_title,
      rep_photo_url,
      date
      } = req.body;
  const issuesQuery = `INSERT INTO issues (title, text, lat, lng, rep_name, rep_photo_url, date) VALUES ('${title}', '${text}', ${lat}, ${lng}, '${rep_name}', '${rep_photo_url}',' ${date}');`;
  db.query(issuesQuery, (err, result) => {
    if (err) {
        console.log(err);
        res.status(400);
    } else {
        for (let i = 0; i < categories.length; i++) {
            const categoriesQuery = `INSERT INTO categories (cat_name) VALUES ('${categories[i]}');`;
            db.query(categoriesQuery, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    for (let j = 0; j < photos.length; j++) {
                        const photosQuery = `INSERT INTO photos (photo_info) VALUES ('${photos[j]}');`
                        db.query(photosQuery, (err, result) => {
                            if (err) console.log(err)})
                    }
                }
            })
        }
        res.status(200).send(result);
    }
  });
};

module.exports.postIssue = postIssue;