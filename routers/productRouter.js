const { Router } = require("express");

const ProductController = require("../controllers/productController");

const upload = require("../middlewares/upload");
const router = Router();

router.get("/product", ProductController.listPage);
router.get("/product/create", ProductController.createPage);
router.post("/product", upload.single('img'), ProductController.store);
router.get("/product/:id", ProductController.detailPage);
router.get("/product/:id/edit", ProductController.editPage);
router.post("/product/:id/edit", upload.single('img'), ProductController.update);
router.post("/product/:id/delete", ProductController.delete);

module.exports = router;
