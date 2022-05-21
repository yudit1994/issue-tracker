const mongoose = require('mongoose');
const db= mongoose.connection;


mongoose.connect('mongodb://localhost:27017/issue-tracker');


module.exports=db;