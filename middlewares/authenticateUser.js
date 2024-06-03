require("dotenv").config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env || {};
const jwt = require("jsonwebtoken");
const { isUndefined, isEmpty } = require('lodash');

function verifyJWT(accessToken, refreshToken) {
    let userDetails = {};
    try {
        userDetails = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        return userDetails;
    } catch (err) {
        if (err?.name === "TokenExpiredError") {
            userDetails = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
            return { ...userDetails, isTokenRefreshed: true };
        }
    }
}

async function authenticateUser(req, res, next) {
    try {
        const accessToken = req.headers.authorization.split(" ")[1];
        const refreshToken = req.headers["refresh-token"];

        if (isUndefined(accessToken) || isUndefined(refreshToken)) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }

        const tokenDetails = verifyJWT(accessToken, refreshToken);

        if (isEmpty(tokenDetails)) {
            throw Error("Unauthorized");
        }

        const { isTokenRefreshed = false } = tokenDetails;

        if (isTokenRefreshed) {
            const newAccessToken = generateJwt({ userId: tokenDetails?.userId }, ACCESS_TOKEN_SECRET, '1h');
            res.setHeader('refresh-token', 'Bearer ' + newAccessToken);
        } else {
            res.setHeader('refresh-token', false);
        }
        next();
    } catch (err) {
        return res.status(401).send({
            message: 'Unauthorized',
        });
    }
}

const generateJwt = (tokenDetails, secret, expiresIn) => {
    const token = jwt.sign(tokenDetails, secret, { expiresIn });
    return token;
};

module.exports = { authenticateUser };
