const express = require('express');
const {  createUser,getUser,updateUser,deleteUser } = require('../controllers/adminController');
const adminRouter = express.Router();
const auth = require("../middlewares/auth");

adminRouter.get("/",getUser);

adminRouter.post("/",createUser);

adminRouter.delete("/:id",auth,deleteUser);

adminRouter.put("/:id",auth,updateUser);

module.exports = adminRouter;