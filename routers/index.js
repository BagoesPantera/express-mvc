const { Router } = require("express");

const auth = require("../middlewares/auth");
const authRouter = require("./authRouter");

const router = Router();

router.use(authRouter);
router.use(auth);

router.get("/", (req, res) => {
    res.status(200).json({ msg: "Server connected" });
});

module.exports = router;