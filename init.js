const mongoose = require('mongoose');
const data=require("./models/upload.js")
main()
    .then(console.log("connection successful"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/records');
}

// let data1 = new data({
//     aadhaarno:"9900447762",
//     dat:"22-11-23",
//     type:"123456789",
//     name:"csdacdscsd",
//     medication:"hbhcabsdjkcjs",
//     remarks:"hello there"
// })

// data1.save()
//   .then((res)=>{console.log(res)})
//   .catch((err)=>{console.log(err)})