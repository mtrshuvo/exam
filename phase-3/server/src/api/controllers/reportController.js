const Report = require("../models/projectReport");

module.exports.singleReportUploaad = async(req, res)=> {    

}

module.exports.allReports = async(req, res)=> {
 try{
    const reports = await Report.find().lean();
    if(reports.length){
        return res.status(200).json(reports)
    }
    return res.status(400).json({"message": "no data found"})
 }catch(err){
    res.status(500).download({"message": "Error occured"});

 }
}

module.exports.singleReportDownlod = async(req, res)=> {

    try{const cloudinary_id = req.params.cid;
    const report = await Report.findOne({cloudinary_id});
    console.log(report);
    if(!report) return res.status(400).json({"message": "not found"});
    res.status(200).download(report.link);
}catch(err){
    res.status(500).download({"message": "Error occured"});

}
}
module.exports.singleReportDelete = async(req, res)=> {

}