const { ObjectId } = require("mongodb")

const ProductDetailsById = async (Requst, DataModel, Joint1, Joint2) => {

    try {

        let DetailsId = Requst.params.id
        let Id = new ObjectId(DetailsId)
        let QueryObject = {}
        QueryObject["_id"] = Id
        console.log(QueryObject)
        if (DataModel) {
            let data = await DataModel.aggregate([
                { $match: QueryObject },
                Joint1, Joint2,
            ])

            return { stutas: "Success", data: data }
        }

    } catch (error) {
        return { stutas: "Error", data: error.toString() }
    }
}

module.exports = ProductDetailsById
