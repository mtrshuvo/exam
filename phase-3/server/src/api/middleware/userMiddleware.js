const User = require("../models/userModel");
module.exports.isNslIdAlreadyUsed = async(req, res, next)=> {
    // const errors = validationMessages(validationResult(req).mapped());
    // if (isErrorFounds(errors)) res.status(400).json(errors);
    const {nslId} = req.body
    const user = await User.findOne({nslId});
    if (user) return res.status(400).json({"message" : "Nsl Id already used"});
    else {
        next()
    }
        
}