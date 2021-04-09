const db = require('../../db/index.js');

const postIssue = (req, res) => {
  const {
    user_id,
    categories, // array
    title,
    text,
    lat,
    lng,
    photos, // array
    rep_name,
    // rep_title,
    rep_email,
    rep_photo_url,
    date,
  } = req.body;
  const newDate = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = newDate.toLocaleDateString(undefined, options);
  const issuesQuery = `INSERT INTO issues (user_id, title, text, lat, lng, rep_name, rep_email, rep_photo_url, date) VALUES (${user_id}, '${title}', '${text}', ${lat}, ${lng}, '${rep_name}', '${rep_email}', '${rep_photo_url}',' ${formattedDate}');`;
  db.query(issuesQuery, (issueErr) => {
    if (issueErr) {
      console.log(issueErr);
      res.status(400);
    } else {
      const issueIdQuery = 'SELECT issue_id FROM issues ORDER BY issue_id DESC LIMIT 1;';
      db.query(issueIdQuery, (issueIdErr, issueIdResults) => {
        if (issueIdErr) {
          console.log(issueIdErr);
          res.status(400);
        } else {
          const issueId = issueIdResults[0].issue_id;
          // console.log(issueId);
          // console.log('issueId results:', issueIdResults);
          Promise.all(categories.map((cat) => {
            const categoriesQuery = `INSERT INTO issues_category (issue_id, cat_id) VALUES ('${issueId}', '${cat}');`;
            return (db.query(categoriesQuery, (categoryErr) => {
              if (categoryErr) {
                console.log(categoryErr);
                res.status(400);
              }
            }));
          }))
            .then(() => {
              if (photos) {
                for (let i = 0; i < photos.length; i++) {
                  const photosQuery = `INSERT INTO photos (issue_id, photo_info) VALUES ('${issueId}', '${photos[i]}');`;
                  db.query(photosQuery, (photoErr) => {
                    if (photoErr) {
                      console.log(photoErr);
                      res.status(400);
                    }
                    if (i === photos.length - 1) {
                      res.sendStatus(200);
                    }
                  });
                }
              } else {
                res.sendStatus(200);
              }
            });
        }
      });
    }
  });
};

module.exports.postIssue = postIssue;
