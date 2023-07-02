const { Router } = require("express");

const auth = require("../middlewares/auth");
const authRouter = require("./authRouter");
const productRouter = require("./productRouter")

const router = Router();

router.use(authRouter);

router.use(auth);

// router.get("/", (req, res) => {
//     res.status(200).json({ msg: "Server connected" });
// });
router.get("/", (req, res) => {
    res.render("pages/index");
});
router.use(productRouter)

module.exports = router;