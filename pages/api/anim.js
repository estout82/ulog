
import fs from 'fs';

export default function handler(req, res) {
    if (req.method == 'GET') {
        fs.readFile('./data/anim.json', (error, data) => {
            if (error) {
                res.status(500).send({
                  message: "unable to read animation file",
                  detail: error.message
                });
            } else {
                let animData = JSON.parse(data);

                res.status(200).send({
                    data: JSON.stringify(animData)
                })
            }
        })
    } else {
        res.status(405).send({
            message: "Method not allowed"
        })
    }
}