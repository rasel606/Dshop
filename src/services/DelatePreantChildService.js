const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const DelatePreantChildService = async (Requst, ParentModel, ChildsModel, JointPropertyName) => {

    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        let DelateId = Requst.params.id
        let email = Requst.headers["email"]
        console.log(DelateId)
        let ChildQueryObject = {}
        ChildQueryObject[JointPropertyName] = DelateId
        ChildQueryObject["email"] = email


        let ParentQueryObject = {}
        ParentQueryObject["_id"] = new ObjectId(DelateId)

        ParentQueryObject["email"] = email
        console.log(ParentQueryObject)
        let ChildsDelate = await ChildsModel.deleteMany(ChildQueryObject, { session })
        console.log(ChildsDelate)
        let ParentDelate = await ParentModel.deleteOne(ParentQueryObject, { session })
        console.log(ParentDelate)
        await session.commitTransaction()
        session.endSession()
        return { status: "success", Parent: ParentDelate, Childs: ChildsDelate }

    } catch (error) {
        return { status: "Fail", data: error.toString() }
    }
}
module.exports = DelatePreantChildService