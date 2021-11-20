
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function getJwtSecret() {
    return process.env.SECRET || "1234"; // TODO: throw error if no secret config
}

function isLoggedIn(req) {
    const authHeader = req.headers['x-auth'];

    if (authHeader) {
        try {
            const decoded = verifyToken(authHeader);

            if (decoded)
                return true;
        } catch (e) {
            return false;
        }
    }

    return false;
}

function verifyCreds(creds) {
    if (!creds)
        return false;

    const secret = process.env.SECRET || "1234";
    const secretHash = bcrypt.hashSync(secret, 5);

    return bcrypt.compareSync(creds, secretHash);
}

function verifyToken(token) {
    return jwt.verify(token, getJwtSecret());
}

function generateToken() {
    const secret = process.env.SECRET || "1234";
    
    // return jwt with the secret and exp
    const token = jwt.sign({ secret }, getJwtSecret(), {
        expiresIn: '1d'
    });

    return token;
}

module.exports = {
    verifyCreds,
    generateToken,
    isLoggedIn
}