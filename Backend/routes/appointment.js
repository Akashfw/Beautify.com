const express = require("express");
const approuter = express.Router();

const {Saloonmodel}=require("../models/saloons.model")
const {Apointmentmodel}=require("../models/appointment.model")
//=====================> serch api
approuter.post("/search",async(req,res)=>{
const {name,city}=req.body;
let data = await Saloonmodel.find({
    $and: [
        { "services.service": { $regex: name, $options: 'i' } },
        { "address": { $regex: city, $options: 'i' } }
    ]
})
console.log(data)
 res.send(data)
})
//===================================> Appoinment api
approuter.post("/appointment",async(req,res)=>{
    const {saloonid,userid,bookingDate,timingslot,totalbill,services}=req.body
    try {
        let data= new Apointmentmodel({saloonid,userid,bookingDate,timingslot,totalbill,services})
        await data.save();
        res.send("apointed successfull"+data)
    } catch (error) {
        res.send(error.message)
    }
})
//====================================>checkavailabilty api
approuter.get("/checkavailability",async(req,res)=>{
    const {bookingDate,saloonid}=req.body
try {
   
    const [{totalemployees,timingslots}]=await Saloonmodel.find({"_id":saloonid}, {"timingslots": 1,"totalemployees":1,_id:0})
    let data= await Apointmentmodel.find({bookingDate,saloonid},{"timingslot":1,"_id":0})
    
    let count= Math.floor(totalemployees.length/2)
    let obj={}
   for(let i=0;i<timingslots.length-1;i++)
   {
   obj[timingslots[i]]=0
    }
    for(let i=0;i<data.length;i++)
    {
        if(obj[data[i].timingslot]<=count)
        {
obj[data[i].timingslot]++
    }else{
        obj[data[i].timingslot]=false;
    }
    }
    res.status(200).send([JSON.stringify(obj),count])
} catch (error) {
    res.status(404).send(error.message)
}
})


module.exports={approuter}