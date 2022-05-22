const { singleReportDelete, singleReportDownlod, singleReportUploaad, allReports } = require("../controllers/reportController");
const { Authorize } = require("../middleware/authorize");
const upload = require("../utils/multer");
const router = require("express").Router();
const cloudinary = require("../utils/cloudnary");
const Report = require("../models/projectReport");

router.route("/").get(Authorize,allReports)
router.route("/upload").post(upload.single("file"), async (req, res) => {
    try {
      console.log(req.file);
      const result = await cloudinary.uploader.upload(req.file.path);
      let report = new Report({
        title: req.body.title,
        link: result.secure_url,
        cloudinary_id: result.public_id,
      });
      await report.save();
      res.status(200).json({"message": "file uploaded","data": report});
    } catch (err) {
      console.log(err);
      res.status(500).json({"message": "Something went wrong"});

    }
  });

router.route("/:cid")
    .get(Authorize,singleReportDownlod)
    .delete(Authorize,singleReportDelete);

module.exports = router;