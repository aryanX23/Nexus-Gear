require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.sendStatus(403);
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                }
                next();
            }
        );
    }
    catch (e) {
        console.log(e);
        res.sendStatus(403);
    }
}

module.exports = verifyJWT