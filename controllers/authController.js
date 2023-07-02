const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("../lib/passport")
const { generateHash } = require("../lib/bcrypt");

class AuthController {
  static loginPage (req, res) {
    if (req.isAuthenticated()) return res.redirect("/")

    res.render("pages/login")
  }

  static registerPage(req, res) {
    if (req.isAuthenticated()) return res.redirect("/")

    res.render("pages/register")
  }

  static async register(req, res, next){
    if (req.body.password != req.body.confirmPassword) {
      res.render("pages/register", { messages:{error:"Password and Confirm Password doesnt match!"} });
    }else{
      try {
        await prisma.user.create({
          data: {
            username: req.body.username,
            password: await generateHash(req.body.password)
          }
        })
        passport.authenticate("local", {
          successRedirect: "/",
          failureRedirect: "/login",
          failureFlash: true, // Untuk mengaktifkan express flash
        })(req, res, next);
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2002") {
            req.flash("error", "An username with this name is already in use");
          }
        }
        res.redirect("/register")
      }
    } 
  }

  static async login(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true, // Untuk mengaktifkan express flash
    })(req, res, next);
  }

  static async logout (req, res, next) {
    req.logout(err => {
      if (err) {
        return next(err)
      }

      res.redirect("/login")
    })
  }
}

module.exports = AuthController