const mongoose = require("mongoose");

const uploadSchema = mongoose.Schema({
    aadhaarno:{
        type:Number,
        require:true,
    },
    dat:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    medication:{
        type:String,
        require:true
    },
    remarks:{
        type:String,
        require:true
    }

})

const Data = mongoose.model("Data",uploadSchema);

module.exports=Data;