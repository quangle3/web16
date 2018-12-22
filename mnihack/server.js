const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const nameModel = require("./models/nameModel");
const app = express();

mongoose.connect('mongodb://localhost/mnihack',
    { useNewUrlParser: true },
    (err) => {
        if(err) console.log(err);
        else console.log("connected");
    }
)

nameModel.find({}, (err, name) => {
    if(err) console.log(err)
    else console.log("List name: ", name);
});

// nameModel.find({ _id: "5c0767ed213d030600d0037a"}).remove().exec();

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/pageDetail/:id", (req,res) => {
    let id = req.params.id;
    nameModel.findById(id, (err, doc) => {
        if(err) console.log(err);
        else {
            if(doc) res.sendFile(__dirname + "/views/pageDetail.html");
            else res.redirect('/');
        }
    });
    
});

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/namePlayer.html");
});

app.post("/", (req,res) => {
    console.log(req.body);
    nameModel.create({name : req.body.name}, (err, nameCreated) => {
        if(err) console.log(err);
        else console.log(nameCreated);
             res.redirect("/pageDetail/" + nameCreated._id);
    });
});

app.get("/game/:gameId", (req,res) => {
    let gameId = req.params.gameId;
    nameModel.findById(gameId, function(err, doc) {
        if(err) console.log(err);
        else res.send(doc.name)
    });
});

app.post("/input/:gameId", (req,res) => {
    let gameId = req.body.gameId;
    let inputValue = req.body.value;
    // console.log(inputValue);
    res.send(inputValue);
    nameModel.update({_id: gameId}, {$set: {"input" : JSON.parse(inputValue)}}, (err,doc) => {
        if(err) console.log(err);
        else console.log(doc);
    });
       
});

app.get("/data/:gameId", (req,res) => {
    const gameId = req.params.gameId;
    nameModel.findById(gameId, (err,doc) => {
        if(err) console.log(err);
        else res.send(doc.input);
    });
});

// nameModel.remove({}, function(err) { 
//     console.log('collection removed') 
//  });

app.use(express.static('views'));

app.listen(3000, (err) => {
    if(err) console.log(err)
    else console.log("Success!!!");
});