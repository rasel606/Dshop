const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({

    email: { type: String },
    ProductId: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    CetagoryID: { type: mongoose.Schema.Types.ObjectId },
    BrandID: { type: mongoose.Schema.Types.ObjectId },
    CreatedDate: { type: Date, default: Date.now() },
    quantity: { type: Number },

},
    {
        versionKey: false
    })

const AddTOCardModel = mongoose.model("AddTOCardModel", DataSchema)
module.exports = AddTOCardModel
