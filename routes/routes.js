const router = require("express").Router();
const express = require("express")
const TaskController = require("../controller/TaskController");
const auth = require("../controller/authController");

//Coloquei o todo para a lista
router.get("/todo",auth, TaskController.getAllTask);
router.get("/getByID/:id/:method", TaskController.getById);
router.get("/deleteTask/:id", TaskController.deleteTask);
router.get("/check/:id", TaskController.Taskcheck);

router.post("/create", TaskController.createTask);
router.post("/update/:id", TaskController.update);

//Register
router.get("/register",TaskController.registerget)

router.post("/register",TaskController.registerpost)
router.post("/",express.json(),TaskController.loginpost)

module.exports = router;
