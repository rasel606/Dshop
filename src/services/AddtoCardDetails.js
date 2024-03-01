

const DetailsById = async (Requst, DataModel) => {

    try {
        let email = Requst.params["email"]
        let QueryObject = {}
        QueryObject["email"] = email
        console.log(QueryObject)
        if (DataModel) {
            let data = await DataModel.aggregate([
                { $match: QueryObject },



            ])

            return { stutas: "Success", data: data }
        }

    } catch (error) {
        return { stutas: "Error", data: error.toString() }
    }
}

module.exports = DetailsById