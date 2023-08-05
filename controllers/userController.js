const Users = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

async function addUser(req, res, next) {
    try {
        const { name, email, password } = req.body;
        const exists = await Users.findOne({ email });
        if (exists) {
            return res.send({ response: "User Already Exists" });
        }
        const newUser = new Users({ name, email });
        bcrypt.hash(password, 10, async (err, hashedPass) => {
            newUser.set('password', hashedPass);
            await newUser.save();
            next();
        });
        return res.send({response:"User Registered Successfully!"});
    }
    catch (e) {
        console.log(e);
        return res.send({response: "Error in user controller!"});
    }
}
async function handleLogin(req, res){
    try {
        const { email, password } = req.body;
        const exists = await Users.findOne({ email });
        if (!exists) {
            res.send({ response: "Incorrect Email", authenticated: false });
            return;
        }
        const isValid = await bcrypt.compare(password, exists.password);
        if (!isValid) {
            res.send({ response: "Incorrect Password", authenticated: false });
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
        res.cookie('JWT_TOKEN', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: false, sameSite: "None" });
        res.send({ ACCESS_TOKEN: accessToken, authenticated: true });
        return;
    }
    catch (e) {
        console.log(e);
        res.send({response:"Error",authenticated: false});
    }
}

module.exports = {
    addUser,
    handleLogin,
}