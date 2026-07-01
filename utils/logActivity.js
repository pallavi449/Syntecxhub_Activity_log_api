const ActivityLog=require("../models/ActivityLog");

const logActivity=async({
user,
action,
resource,
resourceId,
details,
req
})=>{

await ActivityLog.create({

user,

action,

resource,

resourceId,

details,

ipAddress:req.ip,

userAgent:req.headers["user-agent"]

});

};

module.exports=logActivity;