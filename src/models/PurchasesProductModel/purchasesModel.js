const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({

    email: { type: String },
    PurchasesId: { type: String, unique: false },
    ProductId: { type: String, unique: false },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    CetagoryID: { type: mongoose.Schema.Types.ObjectId, unique: false },
    BrandID: { type: mongoose.Schema.Types.ObjectId, unique: false },
    SessionCollectionName: { type: String },
    Unite: { type: String },
    image: { type: String },
    quantity: { type: Number },
    Offer: { type: Number },
    OfferPrice: { type: Number },
    Total: { type: Number },
    Note: { type: String },
    status: { type: String, defult: "Pending-Order" },
    transactionId: { type: String },
    CreatedDate: { type: Date, default: Date.now() },

},
    {
        versionKey: false
    })

const PurchasesModel = mongoose.model("PurchasesModel", DataSchema)
module.exports = PurchasesModel