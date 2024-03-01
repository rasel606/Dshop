const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({

    email: { type: String },
    CarosulModelName: { type: String },
    CarosulModelImage: { type: String },
    CreatedDate: { type: Date, default: Date.now() },

},
    {
        versionKey: false
    })

const CarosulModel = mongoose.model("CarosulModel", DataSchema)
module.exports = CarosulModel