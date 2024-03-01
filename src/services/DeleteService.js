

const DeleteService = async (Requst, DataModel) => {

    try {

        let DeleteId = Requst.params.id
        let email = Requst.headers["email"]
        console.log(DeleteId, email)
        let QueryObject = {}
        QueryObject["_id"] = DeleteId
        QueryObject["email"] = email
        let Delete = await DataModel.deleteMany(QueryObject)
        return { status: "success", Delate: Delete }

    } catch (error) {
        return { status: "Fail", data: error.toString() }
    }
};

module.exports = DeleteService;