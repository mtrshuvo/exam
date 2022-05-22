const  Research = require('../models/researchModel')
const {validationResult} = require("express-validator");
const {validationMessages} = require("../utils/errorHelper");

module.exports.createResearchPaper = async(req,res)=>{
    try{

        const errors = validationMessages(validationResult(req).mapped());
        if (isErrorFounds(errors)) return res.status(400).json(errors)
        const paper = new Research({...req.body})
        await paper.save()
        return res.status(200).json({message:"Paper uploaded successfully"})
    }catch(e){
        return res.status(500).json({"message": "can't created paper"})
    }
}

module.exports.searchResearchPaper = async(req,res)=>{
    try{
        const {search} = req.body
        const result = await Research.find({title:new RegExp('^'+'.*'+search,'i')})
        if(result.length===0||result===undefined)return res.status(200).json({message:'no data found'})
        return res.status(200).send(result)
    }catch(err){
        return res.status(500).json({"message": "Searching not operational"})
    }
}


// module.exports.contributionCOunt = async(req,res)=>{
//     try{

//         const result = await Research.aggregate([{$group:{_id:"$addedBy",total:{$sum:1}}}])
//     }catch(e){
//         return res.status(500).json({"message": "Something went wrong"});
//     }

//     return res.status(200).send(result)
// }
