// Import mongoose
const mongoose = require('mongoose');

// Creating schema
const configSchema = new mongoose.Schema(
{
  rfc: String,
  nameStreet: String,
  number: String,
  businessEntity: String,
  postalCode: Number,
  commercialName: String,
  tel: Number,
  iva: Number,
  shipments: [{
    name: String,
    price: Number,
    leadTime: String,
  }],
  categories: [String]
  }
);

// Creating model
const configuration = mongoose.model("config", configSchema);

// Exports
module.exports = configuration;