const express = require("express");
const app = express();

const bodyParser = require("body-parser")
const serverConfig = require('./configs/server.config')
const dbConfig = require("./configs/db.config")
const mongoose = require("mongoose")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on('error',()=>{
    console.log("Error while connecting to MongoDB")
})
db.once("open",()=>{
    console.log("Connected to MongoDB")
    init();
})

const Todo = require('./models/todo.model');

async function init(){
    try{
    await Todo.collection.drop();
    }catch(err){
        console.log("Error while dropping the collection",err);
        resizeBy.status(500).send({
            message : "Internal server error"
        })
    }
}

require("./routes/todo.route")(app);

app.listen(serverConfig.PORT,()=>{
    console.log("Started the server on the Port number :",serverConfig.PORT)
})