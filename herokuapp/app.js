const express = require('express');
let app = express();
const axios = require('axios');




app.listen(3000, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Start server");
    }
});

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

 app.get('/web:id', (req, res) =>{
    let id = req.params['id'];
    // const { classname } = req.query;
    // const { id } = req.query
    // axios.get(`https://btvn-web16s.herokuapp.com/api/web${id}`, {
    // }).then(res => {
    //     // console.log(res.data);
    //     // response.send(res.data.students);
    //     let arr = res.data.students;
    //     // arr.forEach(element => {
    //     //         response.send(`<ul><li>${element}</li></ul>`);
    //     // });
    //     response.send(arr.forEach(element => {
    //         `<ul><li>${element}</li></ul>`
    //     }));
        
    // }).catch(err => {
    //     console.log(err);
    // });
    axios({
        method: 'GET',
        url: `https://btvn-web16s.herokuapp.com/api/web${id}`,
    }).then(({data}) => {
        const { students } = data;
        // let studentHTML = "";
        // for (let index = 0; index < students.length; index++) {
        //     studentHTML = studentHTML + "<li>" + students[index] + "</li>";            
        // }
        // // console.log(studentHTML);
        // res.send(`<ol>${studentHTML}</ol>`);
        const studentHTML = students.map((student)=>{
            return `<li>${student}</li>`
        });
        res.send(`<ol>${studentHTML.join("")}</ol>`)
    });
});

app.get("/", (req, res) => {
	const { classname } = req.query;
	axios({
		method: 'GET',
  		url: `https://btvn-web16s.herokuapp.com/api/${classname}`,
	}).then(({ data }) => {
		const { students } = data;
		const studentHTML = students.map(student => `<li>${student}</li>`);
		res.send(`<ol>${studentHTML.join("")}</ol>`);
	});
});






