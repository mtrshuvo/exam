const router = require("express").Router();
const {signIn, signUp, passwordChange, createUser, getAlluser, findAllMember, findAllTeamLead} = require("../controllers/userController");
const { Authorize } = require("../middleware/authorize");
const { isNslIdAlreadyUsed } = require("../middleware/userMiddleware");
const { signInBodyValidation, passwordBodycheck  } = require("./../middleware/validation/commonValidator");

router.route("/signup").post(signUp);
router.route("/signin").post(signInBodyValidation, signIn);
router.route("/alluser").get(Authorize, getAlluser)
router.route("/allmember").get(Authorize, findAllMember);
router.route("/allteamlead").get(Authorize, findAllTeamLead);
router.route("/createuser").post(Authorize, isNslIdAlreadyUsed, createUser);
router.route("/changepassword").put( Authorize, passwordChange);

module.exports = router;