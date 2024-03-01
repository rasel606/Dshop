const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({

    email: { type: String },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    CetagoryID: { type: mongoose.Schema.Types.ObjectId },
    BrandID: { type: mongoose.Schema.Types.ObjectId },
    SessionCollectionName: { type: String },
    Unite: { type: String },
    image: { type: String },
    Offer: { type: Number },
    OfferPrice: { type: Number },
    CreatedDate: { type: Date, default: Date.now() },

},
    {
        versionKey: false
    })

const ProductsModel = mongoose.model("ProductsModel", DataSchema)
module.exports = ProductsModel
