const router = require("express").Router();
const { createProject, getAProject, updateAProject, deleteSingleProject, getAllProjects } = require("../controllers/projectController");
const { Authorize } = require("../middleware/authorize");
const { projectTitleValidation } = require("../middleware/validation/commonValidator");

router.route("/").get(Authorize, getAllProjects);
router.route("/create")
    .post( Authorize ,createProject);
router.route("/:id")
    .get(Authorize, getAProject)
    .put(Authorize ,updateAProject)
    .delete(Authorize, deleteSingleProject);

module.exports = router;