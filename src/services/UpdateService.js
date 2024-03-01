const { ObjectId } = require("mongodb");


const UpdateService = async (Requst, DataModel) => {
    try {

        let PostBody = Requst.body
        let id = Requst.params.id
        let email = Requst.headers["email"]

        console.log(id)

        let data = await DataModel.findOneAndUpdate({ _id: new ObjectId(id) }, PostBody)
        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "Fail", data: error.toString() }
    }
};

module.exports = UpdateService;