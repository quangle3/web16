const express = require("express");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();

const UserModel = require("../models/user")

// Middleware
UserRouter.use((req, res, next) => {
	console.log(req.session.userInfo);
	// console.log(req.sessionID);
	if(req.session.userInfo && req.session.userInfo.role == "admin") {
		next();
	} else res.status(401).json({ success: 0, message: "Unauthorized" });
});

UserRouter.post("/", (req,res) => {
    const newUser = req.body;
    const salt = bcrypt.genSaltSync(12);
    const hashPassword = bcrypt.hashSync(newUser.password, salt || 12);
    newUser.password = hashPassword;
    UserModel.create(newUser, (err, userCreated) => {
        if(err) res.status(500).json({ success: 0, message: err});
        else res.status(201).json({ success: 1, message: "Created success!"});
    });
});

UserRouter.get("/", (req,res) => {
    UserModel.find({}, (err,userFound) => {
        if(err) res.status(500).json({ success: 0, message: err});
        else res.json(userFound);
    });
});

UserRouter.get("/:id", (req,res) => {
    const id = req.params.id;
    UserModel.findById(id, (err, userFound) => {
        if(err) res.status(500).json({ success: 0, message: err});
        else res.status(201).json({ success: 1, message: "Created success!"});
    });
});

UserRouter.put("/", (req,res) => {
    UserModel.update({}, (err,userFound) => {
        if(err) res.status(500).json({ success: 0, message: err});
        else res.json({ success: 1, message: "put success!"});
    });
});

UserRouter.put("/:id", (req,res) => {
    const update = req.body;
    const id = req.params.id;
    
    UserModel.findById(id, (err,userFound) => {
        console.log(userFound);
        if(err) res.status(500).json({ success: 0, message: err});
        else if(!userFound || !userFound._id) res.status(500).json({success:0, message:"not found"});
        else {
            if(update.password) {
                if(!bcrypt.compareSync(update.password, userFound.password)) {
                    update.password = bcrypt.hashSync(update.password, 12);
                } else {
                    update.password = undefined;
                }
            }
            for(key in update) {
                if(update[key] && userFound[key]) {
                    userFound[key] = update[key];
                }
            }
            userFound.save(function(err, userUpdated) {
                if(err) res.status(500).json({success:0, message: err});
                else res.json({success:1, message:"updated", data: userUpdated});
            })
        }
    });
});

UserRouter.delete("/", (req,res) => {
    UserModel.remove({}, (err, userFound) => {
        if(err) res.status(500).json({ success: 0, message: err});
        else res.json({ success: 1, message: "delete success!"});
    });
});

UserRouter.delete("/:id", (req,res) => {
    const id = req.params.id;
    UserModel.removeOne(id, (err, userFound) => {
        if(err) res.status(500).json({ success: 0, message: err});
        else res.json({ success: 1, message: "deleteById success!"});
    });
});

module.exports = UserRouter;