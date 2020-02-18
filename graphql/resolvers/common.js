const assert = require("assert");
const Product = require("../../models/product");
const User = require("../../models/user");

const transformProduct = p => {
  return {
    ...p._doc,
    lastUpdated: new Date().toISOString(),
    creator: getUser.bind(this, p.creator)
  };
};

const getProducts = async ({ productIds }) => {
  try {
    const products = productIds
      ? await Product.find({ _id: { $in: productIds } })
      : await Product.find();
    return products.map(e => {
      return transformProduct(e);
    });
  } catch (err) {
    throw err;
  }
};

const transformUser = user => {
  return {
    ...user._doc,
    password: null,
    createdProducts: getProducts.bind(this, {
      productIds: user._doc.createdProducts
    })
  };
};

const getUser = async userId => {
  try {
    const user = await User.findById(userId);
    return transformUser(user);
  } catch (err) {
    throw err;
  }
};

exports.transformProduct = transformProduct;
exports.getProducts = getProducts;
exports.transformUser = transformUser;
exports.getUser = getUser;
