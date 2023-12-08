const mongoose = require("mongoose");

const recordSchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
})

const User = mongoose.model("User",recordSchema);

module.exports=User;