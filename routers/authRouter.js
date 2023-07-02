const { Router } = require("express");

const AuthController = require("../controllers/authController")

const router = Router();

router.get("/login", AuthController.loginPage)
router.post("/login", AuthController.login)
router.get("/register", AuthController.registerPage)
router.post("/register", AuthController.register)
router.post("/logout", AuthController.logout)

module.exports = router; 