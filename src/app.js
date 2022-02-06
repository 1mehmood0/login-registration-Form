const express=require("express");
const path=require("path");
const hbs=require("hbs");
const app=express();
const port=process.env.port||3000;
require("./db/connection");
const customer=require("../src/models/customer");


const stat_path=path.join(__dirname,"../public/css");
const part_path=path.join(__dirname,"../templates/partials");
const temp_path=path.join(__dirname,"../templates/views");

app.use(express.static(stat_path));//static website access
app.set("views",temp_path);
app.set("view engine","hbs");
hbs.registerPartials(part_path);

//json req to object in express
app.use(express.json());
app.use(express.urlencoded({extended:false}));//important code



app.get("/",(req,res)=>{
    res.render("index");
    //res.send("hello new project");
});

app.get("/register",(req,res)=>{
    res.render("register");
});

//login page
app.get("/login",(req,res)=>{
    res.render("login");
});
//login validation
app.post("/login",async(req,res)=>{
    try{
        const emailEnt=req.body.email;//mail entered by user
        const passwordEnt=req.body.password;//password entered by user
       
        const checkmail=await customer.findOne({email:emailEnt});//complete document object of customer

        if(checkmail.password===passwordEnt)
        {
            res.status(201).render("index");
        }
        else{
            res.send("Password incorrect");
        }
    }
    catch(e)
    {
        res.status(400).send("Invalid Email");
    }
});

//when posting data 
app.post("/register",async(req,res)=>{
try{
    const password=req.body.password;
    const cpassword=req.body.confirmpassword;
    if(password===cpassword)
    {
        const registerCustomer=new customer({
            fullname:req.body.fullname,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender,
            age:req.body.age,
            password:req.body.password,
            confirmpassword:req.body.confirmpassword
        })
        const registered=await registerCustomer.save();
        res.status(201).render("index");
    }
    else{
        res.send("Password not matching");
    }
}catch(e){
    res.send(e);
}
})

app.listen(port,()=>{
    console.log(`server running at ${port}`);
});