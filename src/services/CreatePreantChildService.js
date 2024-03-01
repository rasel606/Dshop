const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const CreatePreantChildService = async (Requst, ParentModel, ChildsModel, JointPropertyName) => {

    const session = await mongoose.startSession()
    try {

        session.startTransaction()
        let Parent = Requst.body["Parent"]
        Parent.email = Requst.headers["email"]
        // console.log(Requst.body)
        let ParentCreation = await ParentModel.create([Parent], session)




        try {

            let Childs = Requst.body.Childs

            Childs.forEach(element => {

                ParentCreation[0]["_id"]

                element.ProductId = element._id
                delete element._id
                element[JointPropertyName] = ParentCreation[0]["_id"]
                element["transactionId"] = ParentCreation[0]["transactionId"]

                element["email"] = Requst.headers["email"]
                console.log(element._id)

            });

            console.log(Childs)
            let ChildsCreation = await ChildsModel.insertMany(Childs, { session })
            // console.log(ChildsCreation)
            await session.commitTransaction()
            await session.endSession()
            return { status: "success", Parent: ParentCreation, Childs: ChildsCreation }


        } catch (error) {

            await ParentModel.deleteOne({ _id: ParentCreation["_id"] })

            return { status: "Faild", Parent: "Child Creation Faild" }
            //Parent: "Child Creation Faild",
        }




    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        console.log(error)
        return { status: "Fail", data: error.toString(), Childs }
    }

}
module.exports = CreatePreantChildService