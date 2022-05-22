const mongoose= require('mongoose');
const {Schema, model} = mongoose;
const jwt = require('jsonwebtoken');


const userSchema = Schema({
    name: {
        type: String,
    },
    nslId: {
        type: String,
        unique: true
    },
    password:{
        type:String,
    },
    role: {
        type: String,
        enum: ["admin", "teamlead", "user"],
        default: 'user'
    },
    isFirstTimeLogin: {
        type: Boolean,
        default: true,
    }
},{timestamps: true});

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        nslId: this.nslId,
        roleId: this.role,
        name: this.name,
    },process.env.JWT_SECRET_KEY, {expiresIn: '7d' })
    
    return token;
}
userSchema.methods.findAllTeamLead = function(){
    return mongoose.model("User").find({role: "teamlead"});
}
userSchema.methods.findAllTeamMember = function(){
    return mongoose.model("User").find({role: 'user'});
}


module.exports = model("User",userSchema);
