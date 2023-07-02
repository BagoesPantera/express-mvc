const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProductController {
  static async listPage(req, res) {
    const result = await prisma.product.findMany({
      include: {
        category: true
      }
    })
    res.render("pages/product/list", {products: result})
  }

  static async detailPage(req, res, next) {
    try {
      const result = await prisma.product.findUnique({
        where: {
          id: Number(req.params.id)
        }
      })
      if (result === null) {
        return next();
      }
      res.render("pages/product/detail", {product: result})
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/product");
    }
  }

  static async createPage(req, res) {
    const categories = await prisma.category.findMany()
    res.render("pages/product/add", {categories: categories})
  }

  static async store(req, res) {
    await prisma.product.create({
      data: {
        name: req.body.name,
        qty: Number(req.body.qty),
        available: req.body.available === "true" ? true : false,
        price: Number(req.body.price),
        img: req.file.filename,
        desc: req.body.description,
        categoryId: Number(req.body.categoryId)
      }
    });

    res.redirect("/product");
  }

  static async editPage(req, res) {
    const categories = await prisma.category.findMany()
    const result = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id)
      }
    })

    res.render("pages/product/edit", { product: result, categories: categories });
  }

  static async update(req, res) {
    await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        qty: Number(req.body.qty),
        available: req.body.available === "true" ? true : false,
        price: Number(req.body.price),
        img: req.file ? req.file.filename : undefined,
        desc: req.body.description,
        categoryId: Number(req.body.categoryId)
      }
    });

    res.redirect("/product");
  }

  static async delete(req, res) {
    await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      }
    });

    res.redirect("/product");
  }
}

module.exports = ProductController;
