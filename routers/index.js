const { Router } = require("express");

const auth = require("../middlewares/auth");
const authRouter = require("./authRouter");
const productRouter = require("./productRouter")
const categoryRouter = require("./categoryRouter");
const MainController = require("../controllers/mainController");

const router = Router();

router.use(authRouter);
router.use(auth);

router.get("/", MainController.index);
router.get("/about", MainController.about)

router.use(productRouter)
router.use(categoryRouter)

module.exports = router;