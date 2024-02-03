import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
});

const singleItem = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  products: {
    type: [singleItem],
    validate: [(val: []) => val.length >= 1, "must be at least one item"],
  },
  total: {
    type: Number,
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);
const ProductModel = mongoose.model("Product", productSchema);

export { UserModel, ProductModel };
