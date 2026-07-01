const ActivityLog=require("../models/ActivityLog");

exports.getLogs=async(req,res)=>{

const {user,action,startDate,endDate}=req.query;

let filter={};

if(user){

filter.user=user;

}

if(action){

filter.action=action;

}

if(startDate || endDate){

filter.createdAt={};

if(startDate){

filter.createdAt.$gte=new Date(startDate);

}

if(endDate){

filter.createdAt.$lte=new Date(endDate);

}

}

const logs=await ActivityLog.find(filter)

.populate("user","name email")

.sort({createdAt:-1});

res.json(logs);

};