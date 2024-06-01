const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');
require('dotenv').config();

async function handleRefresh(req, res, next) {
    const cookies = req.cookies;
    if (!cookies?.JWT_TOKEN) {
        return res.sendStatus(403);
    }
    const refreshToken = cookies.JWT_TOKEN;
    const foundUser = await Users.findOne({ token: refreshToken });
    if (!foundUser) {
        return res.sendStatus(403);
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.userId == decoded.userId) {
                return res.sendStatus(403);
            }
            const accessToken = jwt.sign({ "userId": decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
            res.send({ ACCESS_TOKEN: accessToken, userId: foundUser._id });
            return;
        }
    );
}

module.exports = {
    handleRefresh
}