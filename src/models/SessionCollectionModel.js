const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({

    email: { type: String },
    SessionCollectionName: { type: String },
    SessionCollectionImage: { type: String },
    CreatedDate: { type: Date, default: Date.now() },

},
    {
        versionKey: false
    })

const SessionCollectionModel = mongoose.model("SessionCollectionModel", DataSchema)
module.exports = SessionCollectionModel