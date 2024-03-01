const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({

    email: { type: String },
    productPrice: { type: Number },
    total: { type: Number },
    VatTax: { type: Number },
    Discount: { type: Number },
    ShippingCost: { type: Number },
    OutherCost: { type: Number },
    GrandTotal: { type: Number },
    mobile: { type: Number },
    address: { type: String },
    Note: { type: String },
    Status: { type: String, default: "PendingOrder" },
    transactionId: { type: String, unique: false },
    CreatedDate: { type: Date, default: Date.now() },


},
    {
        versionKey: false
    })

const PurchasesProductModel = mongoose.model("PurchasesProductModel", DataSchema)
module.exports = PurchasesProductModel