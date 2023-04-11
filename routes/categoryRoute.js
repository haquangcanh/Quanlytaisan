const router = require("express").Router();
const controller = require("../controllers/categoryController");
const CHECK_LOGIN = require('../middlewares/checkController') 


router.get("/api", controller.getAllCategories);
router.post("/api", controller.createCategory);
router.put("/api/:id", controller.updateCategory);
router.delete("/api/:id", controller.deleteCategory);


module.exports = router;
