const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');

const app = express();

app.use(passport.initialize());

mongoose.connect("mongodb://localhost/passport",
    { useNewUrlParser: true },
    (err) => {
        if(err) console.log(err);
        else console.log("Connected DB");
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
});

app.get("/google", passport.authenticate('google', {
    scope: ['profile']
}));

app.get("/google/redirect", passport.authenticate('google'), (req, res) => {
    res.send("you reached callback URL");
});

app.use(express.static("views"));

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if(err) console.log(err);
    else console.log("Success!!!");
});