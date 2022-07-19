const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
 
  email:{
    type:String, 
    default:"undefined"
  },
  task: {
    type: String,
    require: true,
  },
  check: {
    type: Boolean,
    default: false,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const personSchema = new mongoose.Schema({
  name: String,
  email:String,
  age:Number,
  username:String,
  gender:String,
  password:String,
  task:Array
})

Person = mongoose.model("Person", personSchema)

Task = mongoose.model("Task", taskSchema)

module.exports = Task , Person;
