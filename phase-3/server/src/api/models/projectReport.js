const {Schema, model} = require("mongoose");

const projectReportSchema = new Schema({
    title: {
        type: String,
        unique: true,
    },
    link: {
        type: String,
    },
    cloudinary_id:{
        type: String,
    }
});

module.exports = model("Report", projectReportSchema);