const { ObjectId } = require("mongodb");



const MatchProduct = async (QueryObject, DataModel) => {
    try {

        try {


            let data = await DataModel?.aggregate([
                { $match: QueryObject },

                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        row: []
                    }
                }
            ])

            return data

        } catch (error) {
            return false
        }
    }
    catch (error) {
        return { status: "Fail", data: error.toString() }
    }
};
module.exports = MatchProduct;