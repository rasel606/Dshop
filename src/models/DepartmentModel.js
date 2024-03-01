const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({

    email: { type: String },
    DepartmentName: { type: String },
    DepartmentImage: { type: String },
    CreatedDate: { type: Date, default: Date.now() },

},
    {
        versionKey: false
    })

const DepartmentModels = mongoose.model("DepartmentModels", DataSchema)
module.exports = DepartmentModels
