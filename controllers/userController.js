const Users = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

async function addUser(req, res, next) {
    try {
        const { name, email, password } = req.body;
        const exists = await Users.findOne({ email });
        if (exists) {
            return res.status(403).send({ response: "User Already Exists" });
        }
        const newUser = new Users({ name, email });
        bcrypt.hash(password, 10, async (err, hashedPass) => {
            newUser.set('password', hashedPass);
            await newUser.save();
            next();
        });
        return res.status(200).send({response:"User Registered Successfully!"});
    }
    catch (e) {
        console.log(e);
        return res.status(400).send({response: "Error in user controller!"});
    }
}
async function handleLogin(req, res){
    try {
        const { email, password } = req.body;
        const exists = await Users.findOne({ email });
        if (!exists) {
            res.sendStatus(400);
            return;
        }
        const isValid = await bcrypt.compare(password, exists.password);
        if (!isValid) {
            res.sendStatus(400); 
            return;
        }
        const payload = {
            userId: exists._id,
            email: exists.email
        }
        const ACCESS_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || "hello this is a test:)";
        const REFRESH_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET || "hello this is a test:)";
        const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {expiresIn: '60s'});
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY);
        await Users.updateOne(
            { _id: exists._id },
            {
                $set: { token: refreshToken },
            }
        );
        await exists.save();
        res.cookie('JWT_TOKEN', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true, sameSite: "None" })
        .send({ ACCESS_TOKEN: accessToken, userId: exists._id });
        return;
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
}

module.exports = {
    addUser,
    handleLogin,
}