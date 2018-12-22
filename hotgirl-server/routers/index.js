const express = require("express");
const Router = express.Router();


const userRouter = require("./user") ;
const postRouter = require("./post"); 

Router.get("/", (req,res) => {
    res.send("Hello world");
});

Router.use("/api/users", userRouter);
Router.use("/api/posts", postRouter);

module.exports = Router;