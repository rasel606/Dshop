const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({

    email: { type: String },
    BrandName: { type: String },
    BrandImage: { type: String },
    CreatedDate: { type: Date, default: Date.now() },

},
    {
        versionKey: false
    })

const BrandModel = mongoose.model("BrandModel", DataSchema)
module.exports = BrandModel
