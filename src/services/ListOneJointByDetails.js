const { ObjectId } = require("mongodb")

const ListOneJointByDetails = async (Requst, dataModel, Joint1) => {
    try {

        let DetailsId = Requst.params.id
        let Id = new ObjectId(DetailsId)
        let QueryObject = {}
        QueryObject["_id"] = Id
        console.log(QueryObject)
        if (dataModel) {

            data = await dataModel.aggregate([

                Joint1,
                { $match: QueryObject }
            ])

            console.log(data)
            return { data }
        }

    } catch (error) {
        return { stutas: "Error", data: error.toString() }
    }
}
module.exports = ListOneJointByDetails;