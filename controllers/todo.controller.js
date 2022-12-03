
const Todo = require('../models/todo.model');
const constants = require('../utils/constants')

exports.create = async (req,res) =>{

    try{
    const todoObj = {
        description : req.body.description
    }

    const todoCreated = await Todo.create(todoObj);
    console.log("todo created")
    return res.status(201).send(todoCreated)
} catch(err){
    console.log("Error while creating todo",err);
    res.status(500).send({
        message : "Internal server error"
    })
}
}


exports.findAll = async (req,res) =>{

    try{
    const todos = await Todo.find();

    return res.status(200).send(todos);

    }catch(err){
        console.log("Error while fetching all todos",err);
        res.status(500).send({
            message :  "Internal server error"
        })
    }
}

exports.findById = async (req,res) =>{

    try{
    const todo = await Todo.findOne({"_id": req.params.id});
    return res.status(200).send(todo)
    }catch(err){
        console.log("Error while finding todd by id",err);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}


exports.update = async (req,res) =>{
 
    try{
    const todo = await Todo.findOne({"_id": req.params.id})
    if(todo){
        todo.description = req.body.description ? req.body.description : todo.description;
        todo.status = constants.status.done;
    }
    const updatedTodo = await todo.save();
    return res.status(200).send(updatedTodo)
}catch(err){
    console.log("Error while updating todo",err);
    res.status(500).send({
        message : "Internal server error"
    })
}
}

exports.delete = async(req,res) =>{

    try{
    const todo = await Todo.findOne({"_id": req.params.id});

    if(todo){
        await Todo.deleteOne(todo);
        console.log("Todo deleted")
    }
    res.status(200).send({message : "todo Deleted"})
}catch(err){
    console.log("Error while deleting todo",err);
    res.status(500).send({
        message : "Internal sever error"
    })
}
}

   