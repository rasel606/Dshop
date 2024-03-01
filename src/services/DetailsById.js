const { ObjectId } = require("mongodb")

const DetailsById = async (Requst, DataModel) => {

    try {

        let DetailsId = Requst.params.id
        let Id = new ObjectId(DetailsId)
        let QueryObject = {}
        QueryObject["_id"] = Id
        console.log(QueryObject)
        if (DataModel) {
            let data = await DataModel.aggregate([
                { $match: QueryObject }
            ])
            console.log(data)
            return { stutas: "Success", data: data }
        }

    } catch (error) {
        return { stutas: "Error", data: error.toString() }
    }
}

module.exports = DetailsById