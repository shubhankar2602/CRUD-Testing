const express = require("express");
const app = express();
const userModel = require('./src/models/userModel');
const userRouter = require("./src/routes/userRoutes");
const adminRouter = require("./src/routes/adminRoutes");

app.use(express.json());
app.use("/users",userRouter);
app.use("/admins",adminRouter);

app.use((req,res,next)=>{
  console.log("http method - "+req.method+" , URL "+req.url);
  next();
});


app.get("/",(req,res)=>{
    res.send("Hello welcome to server");
});


app.listen(3000,()=>{
    console.log("server started on port 3000");
})

