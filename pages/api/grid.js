// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const fs = require('fs');
const auth = require('../../lib/auth');

export default function handler(req, res) {
  // require login
  if (!auth.isLoggedIn(req)) {
    res.status(401).json({
      message: "Authentication required"
    });

    return;
  }

  if (req.method == 'POST') {
    fs.readFile('./data/anim.json', (error, data) => {
      if (error) {
        res.status(500).send({
          message: "unable to read animation file",
          detail: error.message
        });
      } else {
        let page = req.body.page;
        let animData = JSON.parse(data);

        if (animData[page]) {
          animData[page] = req.body.data;
        } else {
          // ensure count is only one more, or return bad request
          const pageCount = Object.keys(animData).length;

          if (page == pageCount + 1) {
            animData[page] = req.body.data;
          }
        }

        // save file
        const newFileData = JSON.stringify(animData);
        console.dir(newFileData);
        fs.writeFile('./data/anim.json', JSON.stringify(animData));

        res.status(200).send({
          message: "saved page successfully"
        });
      }
    });
  } else if (req.method == 'GET') {
    let page = req.query.page;

    fs.readFile('./data/anim.json', (error, data) => {
      if (error) {
        res.status(500).send({
          message: 'Unable to read animation file',
          detail: error.message
        });
      } else {
        let animData = JSON.parse(data);

        if (animData[page]) {
          res.status(200).send({
            page: page,
            data: JSON.stringify(animData[page])
          })
        } else {
          res.status(404).send({
            message: "Page not found"
          });
        }
      }
    });
  } else {
    res.status(405).send('method not allowed')
  }
}