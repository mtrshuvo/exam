const Project = require("../models/projectModel");
const { isErrorFounds, validationMessages } = require("../utils/errorHelper");
const { validationResult } = require("express-validator")
const User = require("../models/userModel");
const mongoose = require("mongoose");

module.exports.createProject = async (req, res) => {
   try {const errors = validationMessages(validationResult(req).mapped());
    if (isErrorFounds(errors)) return res.status(400).json(errors)
    const { title, ...rest } = req.body
    const project = await Project.findOne({ title });
    if (project) return res.status(400).json({ "message": "Already title created" });
    const result = await new Project(req.body).save();
    return res.status(201).json({ "message": "Project create successfully", "data": result });
   }catch(err){
    return res.status(500).json({ "message": "Error",});

   }
};

module.exports.updateAProject = async (req, res) => {
    try{
        
        const id = req.params.id;
        const project = await Project.findOne({ _id: id }).lean();
        if (!project) return res.status(400).json({ "message": "Project not found" });
        const { members, ...others } = req.body;

            if (project.teamLead === req.user._id || req.user.role === "admin") {
    
                await Project.findOneAndUpdate({ _id: id }, { $set: { members, ...others } })
                return res.status(201).json({ "message": "Updated successfully" });
            }
            // const p = await Project.findOne({ _id: id, teamLead: req.user._id });
            // if (p) {
            //     await Project.findOneAndUpdate({ _id: id, teamLead: req.user._id }, { $set: { members, ...others } });
            //     return res.status(200).json({ "message": 'Updated successfully' })
            // }
            // else {
            //     return res.status(201).json({ "message": "Your are not authorize to update the information" });
    
            // }
        const p = await Project.findOne({ _id: id, teamLead: req.user._id });
            if (p) {
                await Project.findOneAndUpdate({ _id: id, teamLead: req.user._id }, { $set: { members, ...others } });
                return res.status(200).json({ "message": 'Updated successfully' })
            }
            else {
                return res.status(400).json({ "message": "Your are not authorize to update the information" });
            }
    }catch(e){

        return res.status(500).json({ "message": "Not Updated" });
    }

};

module.exports.uploadProjectReports = async(req, res)=> {

}
module.exports.deleteSingleProject = async(req, res)=> {
    const id = req.params.id;
    const project = await Project.findOne({_id: id});
    if(!project) return res.status(400).json({"message": "Project not found"});
    if(req.user.role === "admin"){
            
        await Project.findOneAndDelete({_id: id});
        return res.status(201).json({"message": "Deleted successfully"});
    }
    // const p = await Project.findOne({_id: id, teamLead: req.user._id});
    // if(p){
    //     await Project.findOneAndDelete({_id: id, teamLead: req.user._id});
    //     return res.status(200).json({"message": 'Deleted successfully'})
    // }
    return res.status(400).json({"message": "Your are not authorize to delete the project"});

    
}


module.exports.getAllProjects = async(req, res)=> {
    if(req.user.role === "admin"){
        const projects = await Project.find();
        return res.status(200).json({"data": projects})
    }
    const projects = await Project.find({$or: [{teamLead: req.user._id}, {members: req.user._id}]});
    if(projects){
        return res.status(200).json({"data": projects})
    }
    return res.status(400).json({"message": "Data not founded"})
}

module.exports.getAProject = async (req, res) => {
    const pId = req.params.id;
    const project = await Project.findOne({ _id: pId });
    if (!project) return res.status(400).json({ "message": "Project not found" });
    return res.status(200).json({ "data": project });
};