const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({

    email: { type: String },
    ReviewProductId: { type: String },
    ReviewStar: { type: Number },
    ReviewComment: { type: String },
    CreatedDate: { type: Date, default: Date.now() },

},
    {
        versionKey: false
    })

const ReviewModel = mongoose.model("ReviewModel", DataSchema)
module.exports = ReviewModel