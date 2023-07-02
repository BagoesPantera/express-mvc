const { Router } = require("express");

const CategoryController = require("../controllers/categoryController");

const router = Router();

router.get("/category", CategoryController.listPage);
router.get("/category/create", CategoryController.createPage);
router.get("/category/:id/edit", CategoryController.editPage);

router.post("/category", CategoryController.store)
router.post("/category/:id/edit", CategoryController.update)
router.post("/category/:id/delete", CategoryController.delete)

module.exports = router;