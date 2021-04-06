const db = require('../../db/index.js');

// .015 a mile for lat
// .018 is a mile for lng

const allIssues = (req, res) => {
  const { user_id, lat, lng } = req.query;
  const maxLat = Number(lat) + (5 * 0.015);
  const minLat = lat - (5 * 0.015);
  const maxLng = Number(lng) + (5 * 0.018);
  const minLng = lng - (5 * 0.018);
  const query = `SELECT i.*, c.cat_name, p.photo_info, u.username FROM issues i
  LEFT JOIN issues_category ic on i.issue_id = ic.issue_id
  LEFT JOIN categories c on c.cat_id = ic.cat_id
  LEFT JOIN photos p on p.issue_id = i.issue_id
  LEFT JOIN users u on u.user_id = i.user_id
  WHERE i.lat <= ${maxLat}
  AND i.lat >= ${minLat}
  AND i.lng <= ${maxLng}
  AND i.lng >= ${minLng}`;
  db.query(query, (err, data) => {
    if (err) { throw err; }
    const issueData = {};
    data.forEach((row) => {
      if (!issueData[row.issue_id]) {
        const rowObj = row;
        rowObj.categories = [];
        rowObj.photos = [];
        rowObj.categories.push(row.cat_name);
        rowObj.photos.push(row.photo_info);
        delete rowObj.cat_name;
        delete rowObj.photo_info;
        issueData[row.issue_id] = rowObj;
      } else {
        if (issueData[row.issue_id].categories.indexOf(row.cat_name) === -1) {
          issueData[row.issue_id].categories.push(row.cat_name);
        }
        if (issueData[row.issue_id].photos.indexOf(row.photo_info) === -1) {
          issueData[row.issue_id].photos.push(row.photo_info);
        }
      }
    });
    const issueArr = [];
    Object.keys(issueData).forEach((key) => {
      issueArr.push(issueData[key]);
    });
    const watchedQuery = `SELECT issue_id FROM watched_issues WHERE user_id = ${user_id}`;
    db.query(watchedQuery, (err2, data2) => {
      if (err2) { throw err2; }
      const updatedData2 = data2.map((row) => row.issue_id);
      const sendObj = {
        issues: issueArr,
        watched: updatedData2,
      };
      res.send(sendObj);
    });
  });
};

module.exports = {
  allIssues,
};
