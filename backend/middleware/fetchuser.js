const jwt = require("jsonwebtoken");
const JWT_SECRET = "HarryisagoodBoy";
const fetchuser = (req, res, next) => {
    //get user from jwttoken and add id to req object;
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "access denied please authenticate using valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.log('hello world');
        
        res.status(401).send({ error: "access denied please authenticate using valid token" });
    }
}
module.exports = fetchuser;