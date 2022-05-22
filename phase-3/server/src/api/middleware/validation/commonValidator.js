const {body} = require("express-validator");
// const { capitalizeFirstLetter } = require("../../helpers/commonHelper");
module.exports.signInBodyValidation = [
    body("nslId")
    .notEmpty().withMessage("nslId required")
    .isString().isLength({min: 3, max: 12}).withMessage("nslid must be mininmum 3 character and maximum 12"),
    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({min: 5}).withMessage("Must be 5 Characters")
]
module.exports.passwordBodycheck = body("password").notEmpty().withMessage("required").isLength({min: 5}).withMessage("password must be at least 5 char")

module.exports.researchPaperbodycheck = [
    body("title").notEmpty().withMessage("required"),
    body("publishYear").notEmpty().withMessage("required"),
    body("project").notEmpty().withMessage("required"),
    body("description").notEmpty().withMessage("required"),
    body("addedBy").notEmpty().withMessage("required"),
]
// module.exports.roleBodyCheck = body("role").contains(["admin", "teamlead", "user"]).withMessage("Role should be ")
module.exports.projectTitleValidation = body("title").notEmpty().withMessage("Title required");