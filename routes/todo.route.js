const todoController = require('../controllers/todo.controller');

module.exports = (app) =>{

    //create todo
    app.post("/api/todo",todoController.create)
    //get all todo
    app.get("/api/todos",todoController.findAll);
    //get todo by id
    app.get("/api/todo/:id",todoController.findById);
    //post call to update todo
    app.post("/api/todo/:id/done",todoController.update);
    //delete todo by id
    app.delete("/api/todo/:id/delete",todoController.delete)
}