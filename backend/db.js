const mongoose=require("mongoose");
const {Schema}=mongoose
const mongoURI="mongodb://localhost:27017/inotebook"
const connectTOmongo=()=>{
    mongoose.connect(mongoURI,{
        });
    console.log('connected successfully');
}


module.exports=connectTOmongo;