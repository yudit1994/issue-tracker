const mongoose = require('mongoose');

const createSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    bugs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'bugs'
    }]
});

const project = mongoose.model('projects',createSchema);
module.exports = project;