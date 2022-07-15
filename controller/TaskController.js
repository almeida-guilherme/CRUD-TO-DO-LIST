const Task = require("../models/Task");
let message = "";
let type = "";

const getAllTask = async (req, res) => {
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
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createTask = async (req, res) => {
  const task = req.body;

  if (!task.task) {
    message = "insira um texto, antes de adicionar a tarefa";
    type = "danger";
    return res.redirect("/");
  }

  try {
    await Task.create(task);
    message = "Tarefa criada com sucesso!";
    type = "success";
    return res.redirect("/");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const taskList = await Task.find();
    if (req.params.method == "update") {
      const task = await Task.findOne({ _id: req.params.id });
      res.render("index", { task, taskDelete: null, taskList, message, type });
    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", { task: null, taskDelete, taskList, message, type });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id }, task);
    message = "Tarefa atualizada com sucesso!";
    type = "success";
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    message = "Tarefa apagada com sucesso!";
    type = "success";
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const Taskcheck = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });

    task.check ? (task.check = false) : (task.check = true);

    await Task.updateOne({ _id: req.params.id }, task);
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllTask,
  createTask,
  getById,
  update,
  deleteTask,
  Taskcheck,
};
