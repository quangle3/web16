const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();

const Router = require("./routers");

mongoose.connect(
    "mongodb://localhost/hotgirl",
    {useNewUrlParser: true},
    (err) => {
        if(err) console.log(err);
        else console.log("connected");
    }
)

app.use(session({
    secret: "hellohowareyou",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 7*24*60*60*1000
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//middleware
app.use((req,res,next) => {
    console.log(req.session);
    console.log(req.sessionID);
    
    next();
});

app.use("/", Router);

const UserModel = require("./models/user");

app.use(express.static('views'));

app.get("/login", (req, res) => {
    if(!req.session.userInfo) res.sendFile(__dirname+"/views/login.html");
    else res.redirect("/"+req.session.userInfo.userId);
});

app.post("/login", (req,res) => {
    const { username, password } = req.body;
    console.log(req.body);
    
    if(username && password) {
        UserModel.findOne({ username }, function(err, userFound) {
            if(err) res.status(500).json({success:0, message: err});
            else if(!userFound || !userFound._id) {
                // res.status(404).json({success:0, message: "not found"})
                res.json({a: "no"});
            }
            else {
                if(bcrypt.compareSync(password, userFound.password)) {
                    const {username, email, _id, role} = userFound;
                    req.session.userInfo = {username, email, userId: _id, role};
                    // res.json({success:1, message:"login success"});
                    res.json({a: "ok"});
                    // res.send(req.session.userInfo);
                } else {
                    // res.status(401).json({success: 0, message: "wrong password"})
                    res.json({a: "no"});
                }
            }
        })
    } else {
        res.json({a: "no"});
    }
});


app.get("/userInfo/:id", (req, res) => {
    const id = req.params.id;
    res.send(req.session.userInfo);
});

app.get("/:id", (req, res) => {
    const id = req.params.id;
    res.sendFile(__dirname + "/views/user.html");
});

app.delete("/logout", (req,res) => {
    req.session.destroy();
    res.json({success: 1, message:"logout success"});
})
// app.get("/", (req,res) => {
//     res.send("hot-girl server");
// });

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if(err) console.log(err);
    else console.log("Success");
})
