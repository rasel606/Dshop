const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({

    email: { type: String, unique: true },
    firstName: { type: String },
    mobile: { type: String },
    photo: { type: String },
    address: { type: String },
    role: { type: String, default: "user" },
    createdDate: { type: Date, default: Date.now() },
},
    {
        versionKey: false
    })

const UsersModel = mongoose.model("users", DataSchema)
module.exports = UsersModel

