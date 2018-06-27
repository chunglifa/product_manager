console.log('SERVER > MODELS > Product.js');
const mongoose = require("mongoose");


var ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'product name must be at least 3 characters'],
  },
  price: {
    type: Number,
    currency: "USD",
    required: true,
    MinValue: [0, 'price must be greater than 0']
  },
  qty:
    {
      type: Number,
      required: true,
      MinValue: [0, 'there must be at least 1 product to store'],
    },
  productid: {
    type: Number,
  }
},
  { timestamps: true }
);


mongoose.model('Product', ProductSchema); //we are setting this schema in our models as Task