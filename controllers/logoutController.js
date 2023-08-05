const Users = require('../models/userModel');
    
async function handleLogout(req, res, next) {
    try {
        const cookies = req.cookies;
        if (!cookies?.JWT_TOKEN) {
            return res.send({ response: "Unauthorized", authenticated: false });
        }
        const refreshToken = cookies.JWT_TOKEN;
        const foundUser = Users.findOne({ token: refreshToken });
        if (!foundUser) {
            return res.send({ response: "User Already Logged Out", authenticated: false });
        }
        await Users.updateOne(
            { token: refreshToken },
            {
                $unset: { token: refreshToken },
            }
        );
    
        return res.status(200).clearCookie("JWT_TOKEN").send({ response: "User Logged Out Successfully", authenticated: false });
    }
    catch (e) {
        console.log(e);
        return res.send({ response: "Internal Error" });
    }
}

module.exports = {
    handleLogout
}