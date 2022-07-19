const { render } = require("ejs");
const Task = require("../models/Task");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
var emailglobal
var nameglobal
let message = "";
let type = "";

const getAllTask = async (req, res,name) => {
  try {
    setTimeout(() => {
      message = "";
    }, 2000);
    const taskList = await Task.find();
    return res.render("index", {
      taskList,
      task: null,
      taskDelete: null,
      message,
      type,
      nameglobal,
      emailglobal
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createTask = async (req, res) => {
  const task = req.body 
  const token = req.header("authorization-token")

  if (!task.task) {
    message = "insira um texto, antes de adicionar a tarefa";
    type = "danger";
    return getAllTask(req,res,token);
  }

  try {
    await Task.create(task);
    await Task.updateOne(task,{$set:{email:`${emailglobal}`}})

    message = "Tarefa criada com sucesso!";
    type = "success";
    return getAllTask(req,res,token);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const taskList = await Task.find();
    if (req.params.method == "update") {
      const task = await Task.findOne({ _id: req.params.id });
      res.render("index", { task, taskDelete: null, taskList, message, type,emailglobal,nameglobal });
    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", { task: null, taskDelete, taskList, message, type,emailglobal,nameglobal });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const task = req.body;
    const token = req.header("authorization-token")
    await Task.updateOne({ _id: req.params.id }, task);
    message = "Tarefa atualizada com sucesso!";
    type = "success";
    return getAllTask(req,res,token);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const token = req.header("authorization-token")
    await Task.deleteOne({ _id: req.params.id });
    message = "Tarefa apagada com sucesso!";
    type = "success";
    return getAllTask(req,res,token);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const Taskcheck = async (req, res) => {
  try {
    const token = req.header("authorization-token")
    const task = await Task.findOne({ _id: req.params.id });

    task.check ? (task.check = false) : (task.check = true);

    await Task.updateOne({ _id: req.params.id }, task);
    return getAllTask(req,res,token);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Login Painel

const registerget = async(req,res) => {
  res.render("components/register")
}

const registerpost = async(req,res) => {
  try{
    const {name, email, age, username, gender,password} = req.body
    passwordWorth = bcrypt.hashSync(password)
    const person = {
      name,
      email,
      age,
      username,
      gender,
      password:passwordWorth,
  }
  
  const confirmUser = await Person.findOne({email:req.body.email})
  if(confirmUser){
    erro = "Esse e-mail já existe"
    return  res.render("components/notsucess",{erro})} 
  
  await Person.create(person)
  res.render("components/registersucess")
  }catch(error){
    res.status(500).send({ error: error.message });
  }
}

const loginpost = async(req,res) => {
  try {
    const confirmUser = await Person.findOne({email:req.body.email})
    if(!confirmUser) {
      erro = "Esse email não existe"
      return res.render("components/notsucess",{erro})} 

    const passwordAndUserMatch = bcrypt.compareSync(req.body.password, confirmUser.password)
    if(!passwordAndUserMatch){
      erro ="Email e senha não convergem"
      return res.render("components/notsucess",{erro})} 
    
    const token = jwt.sign({_id:confirmUser._id},process.env.TOKEN_SECRET)
    
    res.header("authorization-token",token)
    emailglobal = confirmUser.email
    nameglobal = confirmUser.name
    getAllTask(req,res)

  
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  getAllTask,
  createTask,
  getById,
  update,
  deleteTask,
  Taskcheck,
  registerget,
  registerpost,
  loginpost
};
