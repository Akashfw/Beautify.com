const mongoose=require("mongoose");
const saloonSchema=mongoose.Schema({
    "saloon":String,
    "image":String,
    "services":[{ service: String,
                  price: Number}],
    "totalemployees":[String],
    "timingslots":[String],
    "address":String,
    "rating":Number,
    "city":String
});

const Saloonmodel=mongoose.model("saloonsdata",saloonSchema);

module.exports={Saloonmodel}