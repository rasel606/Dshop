const CreatePreantChildService = require("../../services/CreatePreantChildService");

const ListOneService = require("../../services/ListOneJoint");
const PurchasesProductModel = require("../../models/PurchasesProductModel/PurchasesProductModel");
const PurchasesModel = require("../../models/PurchasesProductModel/purchasesModel");
const DelatePreantChildService = require("../../services/DelatePreantChildService");
const PurchasesByDate = require("../../Report/PurchasesByDate");
const ListOneJointByDetail = require("../../services/ListOneJointByDetails");
const UpdateStatusChack = require("../../services/UpdateStatusChack");
const { ObjectId } = require("mongodb");

exports.CreatePurchses = async (req, res) => {
    // console.log(req.body)
    let result = await CreatePreantChildService(req, PurchasesProductModel, PurchasesModel, "PurchasesId")

    res.status(200).json(result)
}



exports.Purchses = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }

    let Joint1 = { $lookup: { from: "purchasesmodels", localField: "_id", foreignField: "PurchasesId", as: "Purchases" } }


    let SearchArray = [{ email: SearchRgx }]
    let result = await ListOneService(req, PurchasesProductModel, SearchArray, Joint1)
    res.status(200).json(result)
}
exports.PurchsesDetailsById = async (req, res) => {
    let Joint1 = { $lookup: { from: "purchasesmodels", localField: "_id", foreignField: "PurchasesId", as: "Purchases" } }
    let result = await ListOneJointByDetail(req, PurchasesProductModel, Joint1)
    res.status(200).json(result)
}

exports.DeletePurchses = async (req, res) => {
    let result = await DelatePreantChildService(req, PurchasesProductModel, PurchasesModel, "PurchasesId")
    res.status(200).json(result)
}
exports.PurchsesReport = async (req, res) => {
    let result = await PurchasesByDate(req)
    res.status(200).json(result)
}
exports.PurchsesStatus = async (req, res) => {

    let Joint1 = { $lookup: { from: "purchasesmodels", localField: "_id", foreignField: "PurchasesId", as: "Purchases" } }
    let result = await UpdateStatusChack(req, PurchasesProductModel, Joint1)
    res.status(200).json(result)
}
exports.PurchsesClientOrder = async (req, res) => {

    let Joint1 = { $lookup: { from: "purchasesmodels", localField: "_id", foreignField: "PurchasesId", as: "Purchases" } }

    const email = req.headers["email"]
    console.log(email)
    const t = "Complate"
    let data = await PurchasesProductModel?.aggregate([
        { $match: { email: email } },

        Joint1,



    ])
    res.status(200).json(data)






}



exports.UpdatePurchsesStatus = async (req, res) => {
    const ReqId = req.params.id
    const Reqbody = req.body
    const id = new ObjectId(ReqId)

    console.log(id)
    console.log(Reqbody)
    const UpdateDoc = { $set: Reqbody }
    console.log(UpdateDoc)

    await PurchasesProductModel.findOneAndUpdate(id, UpdateDoc, { upsert: true })
        .then((data) => {
            console.log(data)
            if (data) {
                res.status(200).json({ status: "success", data: data })
            } else {

                res.status(400).json({ status: "fail", data: "err" })
            }
        })
}
exports.PurchsesStatusCount = async (req, res) => {


    await PurchasesProductModel.aggregate([

        // { $group: { _id: "$CreatedDate" } },

        { $group: { _id: "$Status", sum: { $count: {} } } },
        { $sort: { _id: 1 } }

    ]).then((data) => {
        console.log(data)

        if (!data) {
            res.status(400).json({ status: "fail", data: "err" })
        } else {
            res.status(200).json({ status: "success", data: data })
        }
    })

}

exports.PurchsesMonthlyReportsell = async (req, res) => {


    await PurchasesProductModel.aggregate([

        {
            $group: {
                _id: { $month: '$CreatedDate' }, // Extract the month from the date field
                totalSales: { $sum: '$GrandTotal' } // Sum the sales amount for each month
            }

        },
        { $sort: { '_id': 1 } }

    ]).then((data) => {
        console.log(data)

        if (!data) {
            res.status(400).json({ status: "fail", data: "err" })
        } else {
            res.status(200).json({ status: "success", data: data })
        }
    })

}

