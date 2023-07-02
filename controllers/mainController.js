const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

class MainController {
  static async index(req, res) {
    const resdatasmicro = await prisma.product.findMany({
        where: {
            categoryId: 1,
        },
    });
    const resdatassensor = await prisma.product.findMany({
        where: {
            categoryId: 2,
        },
    });
    res.render("pages/index", {datasmicro: resdatasmicro, datassensor : resdatassensor});
  }

  static async about(req, res){
    res.render("pages/about")
  }
}

module.exports = MainController;