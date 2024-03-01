const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({

    email: { type: String },
    TodoName: { type: String },
    TodoDescription: { type: String },
    TodoStatus: { type: String },
    TodoCreatedDate: { type: Date, default: Date.now() },
    TodoUpdateDate: { type: Date, default: Date.now() },
},
    {
        versionKey: false
    })

const TodoModel = mongoose.model("Todo", DataSchema)
module.exports = TodoModel
