const express = require("express");
var bodyParser = require('body-parser');
const fs = require("fs");
const mongoese = require("mongoose");
const app = express();

const questionModel = require("./models/questionModel");

questionModel.find({}, (err, question) => {
    if(err) console.log(err)
    else console.log("List question: ", question);
});

mongoese.connect("mongodb://localhost/firstapp",
    { useNewUrlParser: true },
    (err) => {
        if(err) console.log(err)
        else console.log("Success!");
});

app.use(bodyParser.urlencoded({ extended: false}));

app.get('/ask', (req,res)=>{
    res.sendFile(__dirname + "/views/ask.html");
});

app.post('/ask', (req,res)=>{
    console.log(req.body);
    // console.log("post data");
    // req.on("data", (data) => {
    //     console.log(String(data).split("=")[1]);
    // })
    // const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf-8'));
    // console.log(questions, questions.length);
    // let newQuestion = {
    //     id: questions.length,
    //     yes: 0,
    //     no: 0,
    //     content: req.body.question
    // }
    // questions.push(newQuestion);
    // fs.writeFileSync("./questions.json", JSON.stringify(questions));
    // res.redirect('/');

    questionModel.create({content: req.body.question}, (err, questionCreated) => {
        if (err) {
            console.log(err)
        } else {
            console.log(questionCreated);
            res.redirect("/");
        }
    })
});

app.get("/", (req,res)=> {
    res.sendFile(__dirname + "/views/home.html");
});

app.get('/randomquestion', (req,res) => {
    questionModel.countDocuments({}, (err, count) => {
        if(err) console.log(err)
        else {
            const randomNum = Math.floor(Math.random()*count);
            questionModel.findOne({}, null, { skip: randomNum }, (err, questionFound) => {
                if(err) console.log(err)
                else res.send(questionFound);
            })
        }
    })
    // const arrQues = JSON.parse(fs.readFileSync('./questions.json', 'utf-8'));
    // console.log(arrQues);
    // res.send(arrQues[Math.floor(Math.random() * arrQues.length)]);
});


app.post('/answer', (req,res)=>{
    const vote = req.body.vote;
    const questionId = req.body.questionId;
    console.log(req.body);
    
    // const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf-8')); 
    
    questionModel.findOne({_id : questionId}, function (err, doc){
        if (vote=="yes") {
            doc.yes +=1;
        } else {
            doc.no +=1;
        }
        doc.save((err) => {
            // res.redirect("http://localhost:3000/question/"+questionId);
            res.send(doc);
        });

      });
    
    // if (vote=="yes") {
    //     questions[questionId].yes +=1;
    // } else {
    //     questions[questionId].no +=1;
    // }
    // fs.writeFileSync('./questions.json', JSON.stringify(questions));
    // res.redirect("http://localhost:3000/question/"+questionId);
})

app.use(express.static("views"));

app.get('/:questionId', (req,res) => {
    const questionId = req.params.questionId;
    res.sendFile(__dirname + "/views/questionResult.html");
});

app.get('/question/:questionId', (req,res) => {
    const questionId  = req.params.questionId;
    // const arrQues = JSON.parse(fs.readFileSync('./questions.json', 'utf-8'));
    // const data = arrQues[questionId];
    // res.send(data);
    // res.sendFile(__dirname + `/views/question.html`);
    questionModel.findById(questionId, (err, questions)=> {
        if(err) console.log(err)
        else res.send(questions);
    })
});

app.listen(3000, (err)=>{
    if (err) {
        console.log("error!!!")
    } else {
        console.log("start success!");
    }
});