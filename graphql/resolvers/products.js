const assert = require("assert");
const Product = require("../../models/product");
const User = require("../../models/user");

const { transformProduct } = require("./common.js");

exports.getProduct = async ({ productId }) => {
  try {
    const product = await Product.findById(productId);
    return transformProduct(product);
  } catch (err) {
    throw err;
  }
};
exports.createProduct = async ({ data, userId }) => {
  try {
    const product = new Product({ ...data });
    product.quantity = data.quantity ? data.quantity : 0;
    product.createdDate = new Date().toISOString();
    product.lastUpdated = new Date().toISOString();
    product.creator = userId;

    const res = await product.save();
    const createdProduct = transformProduct(res);
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User [${userId}] not found.`);
    }
    user.createdProducts.push(product);
    await user.save();

    return createdProduct;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
exports.deleteProduct = async ({ data }) => {
  try {
    const { productId } = data;
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error(`Found no product with id [${productId}]`);
    }
    const res = await Product.deleteOne({ _id: productId });
    const msg =
      res.ok === 1
        ? `...successfully deleted ${res.deletedCount} product with id:${productId};`
        : `...error deleting product [${productId}]: ${res.ok};`;
    console.log(msg);
    return `${msg}`;
  } catch (err) {
    throw err;
  }
};
exports.setProduct = async ({ data }) => {
  assert(data._id.length > 0, "_id parameter must be a non empty string.");
  try {
    const product = await Product.findOne({ _id: data._id });
    Object.keys(data).forEach(k => {
      k === "_id" ? null : (product[k] = data[k]);
    });
    const updatedProduct = await product.save();
    return transformProduct(updatedProduct);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
