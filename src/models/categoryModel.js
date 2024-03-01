const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({

    email: { type: String },
    CetagoryName: { type: String },
    CetagoryImage: { type: String },
    CreatedDate: { type: Date, default: Date.now() },

},
    {
        versionKey: false
    })

const CetagoryModel = mongoose.model("CetagoryModel", DataSchema)
module.exports = CetagoryModel