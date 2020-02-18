const { getProducts } = require("./common.js");
const { createProduct, deleteProduct, setProduct } = require("./products.js");
const { login, createUser } = require("./auth.js");

const checkAuth = (req, f, finput) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!");
  }
  return f({ ...finput });
};
module.exports = {
  products: (args, req) =>
    getProducts({
      productIds: args.productIds
    }),
  createProduct: (args, req) =>
    checkAuth(req, createProduct, {
      data: args.data,
      userId: req.userId
    }),
  deleteProduct: (args, req) => {
    console.log(`resolver.deleteProduct(${args})`);
    console.log(args);
    console.log(args.data);
    return checkAuth(req, deleteProduct, {
      data: args.data,
      userId: req.userId
    });
  },
  setProduct: (args, req) =>
    checkAuth(req, setProduct, {
      data: args.data,
      userId: req.userId
    }),
  createUser: (args, req) => {
    return createUser({
      ...args.data
    });
  },
  login: args => {
    return login(args.email, args.password);
  }
};
