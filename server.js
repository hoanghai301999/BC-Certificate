//express
var express = require("express");
var app = express();
//ejs
app.set("view engine", "ejs");
app.set("views", "./views");
//set public folder
app.use(express.static("public"));
//web 3
app.use("/scripts", express.static(__dirname +"/node_modules/web3.js-browser/build/")); 
app.listen(process.env.PORT || 3000);
// body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

//Moongose 
//registercode , 6fpSEr9NYf1uGoai
const moongoose = require("mongoose");
moongoose.connect('mongodb+srv://registercode:6fpSEr9NYf1uGoai@cluster0.fo4ey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true},function(err){
    if(err){
        console.log("error to connect DB");
    }else{
        console.log("Sucessful to connecdt db");
    }
});

//
const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    }
  ];
app.get("/", function(req,res){
    res.render("layout");
})

app.get("/certificate",function(req,res){
  res.render("certificate");
})

require("./controllers/control")(app);