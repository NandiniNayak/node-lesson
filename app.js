const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const exphbs  = require('express-handlebars');
const port = 3000

const students = ["latchy", "Ben", "Anfii"]

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// body parser middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// use means its a middle ware
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

app.get("/", (req, res)=>{
    // res.send(`<h1> Hello world </h1>`)
    const studentOne = students[Math.floor(Math.random() * students.length)];
    const studentTwo = students[Math.floor(Math.random() * students.length)];
    res.render('home', {
       student1: studentOne,
       student2: studentTwo,
       student3: "nands"
    })
})

app.get("/students", (req, res)=>{
    // res.write(JSON.stringify(students))
    res.send(students)
})
app.post("/add", (req,res) => {
    console.log(req.body)
    students.push(req.body.name)
    res.send(students)
})

// middleware as part of the request : alternate syntax
app.post("/students",(req, res, next) =>{
    console.log("middle ware running")
    next()
},(req,res) => {
    res.send(students)
})


// listen on a specific port
app.listen(port, () => console.log(`listening on port ${port}`))

