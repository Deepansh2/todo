const mongoose = require('mongoose');
const constants = require('../utils/constants')

const todoSchema = new mongoose.Schema({

    description : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true,
        default : constants.status.pending,
        enum : [constants.status.pending,constants.status.done]
    }
})
module.exports = mongoose.model("todo",todoSchema)
  