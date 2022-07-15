const router = require("express").Router();
const TaskController = require("../controller/TaskController")

router.get("/",TaskController.getAllTask)
router.post("/create", TaskController.createTask)
router.get("/getByID/:id/:method", TaskController.getById)
router.post("/update/:id", TaskController.update)
router.get("/deleteTask/:id", TaskController.deleteTask)
router.get("/check/:id", TaskController.Taskcheck)

module.exports = router