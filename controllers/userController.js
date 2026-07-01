const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const logActivity=require("../utils/logActivity");

exports.register=async(req,res)=>{

const {name,email,password,role}=req.body;

const hashed=await bcrypt.hash(password,10);

const user=await User.create({

name,

email,

password:hashed,

role

});

res.json(user);

};

exports.login=async(req,res)=>{

const {email,password}=req.body;

const user=await User.findOne({email});

if(!user){

return res.status(404).json({
message:"User not found"
});

}

const match=await bcrypt.compare(password,user.password);

if(!match){

return res.status(400).json({
message:"Wrong Password"
});

}

const token=jwt.sign({

id:user._id,

role:user.role

},
process.env.JWT_SECRET);

res.json({token});

};

exports.updateUser=async(req,res)=>{

const user=await User.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

await logActivity({

user:req.user.id,

action:"UPDATE_USER",

resource:"User",

resourceId:user._id,

details:req.body,

req

});

res.json(user);

};

exports.deleteUser=async(req,res)=>{

const user=await User.findByIdAndDelete(req.params.id);

await logActivity({

user:req.user.id,

action:"DELETE_USER",

resource:"User",

resourceId:user._id,

details:{
deletedUser:user.email
},

req

});

res.json({

message:"Deleted"

});

};