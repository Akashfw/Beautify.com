const mongoose=require("mongoose");
const apointmentSchema=mongoose.Schema({
    "saloonid":String,
    "userid":String,
    "bookingDate":String,
    "timingslot":String,
    "totalbill":Number,
    "services":[{service:String,price:Number}]
});

const Apointmentmodel=mongoose.model("apointments",apointmentSchema);

module.exports={Apointmentmodel}