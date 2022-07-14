const router = require("express").Router();
const TaskController = require("../controller/TaskController")

router.get("/",TaskController.getAllTask)
router.post("/create", TaskController.createTask)

module.exports = router