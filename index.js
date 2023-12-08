const express=require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose")
const path = require("path");
const methodOverride=require("method-override")
const user=require("./models/signin")
const data=require("./models/upload.js")



app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/records');
}


//welcome route
app.get("/signin",(req,res)=>{
  res.render("singin.ejs")
})
app.get("/signup", async (req,res)=>{
  res.render("signUP.ejs")
})

//posting signin route

app.post("/signin",async (req,res)=>{
  let email=req.body.email;
  let password=req.body.password;
  let usermail = await user.findOne({email:email});
  if(usermail.password==password){
    res.render("choose.ejs")
  }else{
    res.render("error.ejs")
    console.log("error")
  }
})

//posting signup data
app.post("/signup",async(req,res)=>{
  try{
    let email=req.body.email;
    let password=req.body.password;

    let newUser = new user({
      email:email,
      password:password,
    })
    await newUser.save()
      .then((res)=>{console.log(res)})
      .catch((err)=>{console.log(err)})
      res.redirect("/signin");
  
  }catch(err){
    console.log(err)
  }
})


app.get("/",(req,res)=> {
  res.render("welcome.ejs");
})


//choose route

app.get("/choose",(req,res)=>{
  res.render("choose.ejs")
})

//upload route

app.get("/upload",(req,res)=>{
  res.render("upload.ejs")
})
app.post("/upload",async(req,res)=>{
  let aadhaarno = req.body.aadhaar;
  let dat = req.body.date;
  let type = req.body.type;
  let name = req.body.name;
  let medication = req.body.medication;
  let remarks = req.body.remarks;


  let newData= new data({
    aadhaarno:aadhaarno,
    dat:dat,
    type:type,
    name:name,
    medication:medication,
    remarks:remarks
  })

  await newData.save()
    .then((res)=> {console.log(res)})
    .catch((err)=>{console.log(err)})
  res.redirect("/choose");
})

//fetch route

app.get("/fetch",(req,res)=>{
  res.render("fetch.ejs");
})
app.post("/fetch",async(req,res)=>{
  let aadhaar=req.body.aadhaar;
  let userOtp=req.body.otp;
  console.log(aadhaar)
  let otp=8090;
  if(userOtp==otp){
    try{

      let newData = await data.findOne({aadhaarno:aadhaar})
      console.log(newData);
      res.render("data.ejs",{newData});
    }catch(err){
      console.log(err)
    }
  
  }

})

// app.get("/data",async(req,res)=>{

//   let newData= await data.findOne({aadhaarno:aadhaar})
//   console.log(newData);
// })
app.listen(port,(req,res)=> {
    console.log(`server is listning to the poert: ${port}`);
})
