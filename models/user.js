const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
