const jwt = require("jsonwebtoken");

module.exports.Authorize = async(req, res, next)=>{
    try {
        let token = req.header("Authorization");
        token = token.split(" ")[1].trim();
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    }
    catch(e){
        // console.log(e);
        res.status(401).json({"message": "Authorization failed"});
    }
}
