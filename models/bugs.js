const mongoose = require('mongoose');

const bugs = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    labels:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'projects'
    }
});

const bug = mongoose.model('bugs',bugs);
module.exports = bug;