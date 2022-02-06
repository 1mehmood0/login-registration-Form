const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/CustomerData")
.then(()=>{
    console.log("Database connection successful");
})
.catch((e)=>{
    console.log(e);
});


