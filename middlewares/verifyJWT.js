require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.send({ authenticated: false, response: "Unauthorized" });
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err)
                    return res.send({ authenticated: false, response: "Unauthorized" });
                next();
            }
        );
    }
    catch (e) {
        console.log(e);
        res.send({ authenticated: false, response: "Forbidden" });
    }
}

module.exports = verifyJWT