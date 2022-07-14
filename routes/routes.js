const router = require("express").Router();
const TaskController = require("../controller/TaskController")

router.get("/",TaskController.getAll)

module.exports = router