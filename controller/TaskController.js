const Task = require('../models/Task');

const getAllTask = async (req, res) => {
   try{
    const taskList = await Task.find();
    return res.render("index", {taskList});
   } catch(error){
    res.status(500).send({error: error.message})
   }

};

const createTask = async (req,res) => {
  const task = req.body;

  if(!task){
    return res.redirect("/")
  }

  try{
    await Task.create(task)
    return res.redirect("/")
  }catch(error){
    res.status(500).send({error:error.message})
  }
  
}
module.exports = { getAllTask, createTask };
