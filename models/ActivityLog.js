const mongoose=require("mongoose");

const activityLogSchema=new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

action:{
type:String,
required:true
},

resource:String,

resourceId:{
type:mongoose.Schema.Types.ObjectId
},

details:{
type:Object
},

ipAddress:String,

userAgent:String

},
{
timestamps:true
});

module.exports=mongoose.model("ActivityLog",activityLogSchema);