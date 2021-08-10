const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose=require("mongoose");
const bodyparser = require("body-parser");
const port = 80;

//connection 
mongoose.connect('mongodb://localhost:27017/content',{ useNewUrlParser: true  , useUnifiedTopology: true });
//const connection=mongoose.connection;

//define mongoose schema
var contentSchema=new mongoose.Schema({
    name : String ,
    content : String
});

const data = mongoose.model('kaypn', contentSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directo

app.post('/post', (req, res)=>{
    var myData = new data(req.body);
    myData.save().then(()=>{
    // res.send("<h1>This item has been saved to the database</h1>");
        console.log("data sent to database!!")
        // alert("data sent!!");
        // res.sendFile(path.join(__dirname, './views/post.html'));
        res.render('post');
})

});

app.get('/', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    // const params = {'title': 'PubG is the best game', "content": con}
    // res.status(200).render('index',params);  //for pug index lol!!
    // res.sendFile(path.join(__dirname, './views/index.html'));
    res.render('index');
});


// var alldatatodisplay;
// var container=document.getElementsById("container");
app.get('/read',async (req, res)=>{
    try {
        const sendingcontent = await data.find()
        res.render('read', { x: sendingcontent })
     } catch (error) {
        res.status(404).send('<h2>Database Server switched off!! Please wait....Trying to turn it on. content will be shared ASAP!!</h2>')
     }
});

app.get('/post', (req, res)=>{
    // res.sendFile(path.join(__dirname, './views/post.html'));
    res.render('post');
});

app.listen(port,()=>{
    console.log("Server started");
});




