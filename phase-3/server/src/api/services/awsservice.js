const multer = require("multer");
const {v4: uuid} = require("uuid")
const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const AWS = require('aws-sdk')
const multerS3 = require('multer-s3');
//phase-3-exam
//AKIASZJCC2CVKLMPRNNW
// const upload = multer({storage}).single('image')

// module.exports.uploadFile = async(req, res)=> {
//     let myFile = req.file.originalname.split(".")
//     const fileType = myFile[myFile.length - 1];
//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: `${uuid()}.${fileType}`,
//         Body: req.file.buffer
//     }

//     s3.upload(params, (error, data) => {
//         if(error){
//             res.status(500).send(error)
//         }

//         res.status(200).send(data)
//     })
// }


AWS.config.update({
    region: "ap-south-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  
  const s3 = new AWS.S3();
  
  const BUCKET_NAME = process.env.AWS_S3_BUCKET;
  
    // Upload File to S3
    const uploadFile = multer({
      storage: multerS3({
          s3: s3,
          acl: "public-read",
          bucket: BUCKET_NAME,
          key: function (req, file, cb) {
              cb(null, file.originalname)
          }
      })
    })
  
    // Download File from S3
    const downloadFile = async (filename) => {
      try {
        const res = await s3.getObject({ Bucket: BUCKET_NAME, Key: filename }).promise();
        return { success: true, data: res.Body }
      } catch(error) {
        return { success: false, data: null }
      }
    }
    
    // Delete File from S3
    const deleteFile = async (filename) => {
      try {
        await s3.deleteObject({ Bucket: BUCKET_NAME, Key: filename }).promise();
        return { success: true, data: "File deleted Successfully" }
      } catch(error) {
        return { success: false, data: null }
      }
    }
      
    // List All Files Names from S3
    const listFiles = async () => {
      try {
        const files = await s3.listObjectsV2({ Bucket: BUCKET_NAME }).promise();
        const names = files.Contents.map(file => file.Key)
        return { success: true, data: names }
      } catch(error) {
        return { success: false, data: null }
      }
    }

module.exports = {
    listFiles, deleteFile, downloadFile, uploadFile
}