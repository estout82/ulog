
const auth = require('../../lib/auth');

export default function handler(req, res) {
    if (req.method == 'POST') {
        const body = req.body || {};

        if (auth.verifyCreds(body.creds)) {
            // return token
            res.status(200).json({
                message: "Correct secret",
                token: auth.generateToken()
            });
        } else {
            // return 401
            res.status(401).json({
                message: "Incorrect secret",
                token: null
            });
        }
    } else {
        res.status(405).json({
            message: "Method not allowed"
        });
    }
}