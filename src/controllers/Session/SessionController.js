const SessionCollectionModel = require("../../models/SessionCollectionModel");
const CreateService = require("../../services/CreateService");
const UpDateService = require("../../services/UpdateService");
const DropDownService = require("../../services/DropDownService");
const ListViewService = require("../../services/ListService");
const DelateService = require("../../services/DeleteService");
const ChackAssociateService = require("../../services/ChackAssociateService");
const DetailsById = require("../../services/DetailsById");
const { ObjectId } = require("mongodb");
const ProductsModel = require("../../models/ProductsModel");

exports.CreateSessionCollection = async (req, res) => {
    let result = await CreateService(req, SessionCollectionModel)
    res.status(200).json(result)
}

exports.UpdateSessionCollection = async (req, res) => {
    let result = await UpDateService(req, SessionCollectionModel)
    res.status(200).json(result)
}

exports.SessionCollection = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }

    let SearchArray = [{ SessionCollectionName: SearchRgx }]
    let result = await ListViewService(req, SessionCollectionModel, SearchArray)
    res.status(200).json(result)
}

exports.SessionCollectionDropDown = async (req, res) => {
    let result = await DropDownService(req, SessionCollectionModel, { _id: 1, SessionCollectionName: 1 }, { SessionCollectionName: 1 })
    res.status(200).json(result)
}

exports.SessionCollectiondelate = async (req, res) => {

    let DelateID = req.params.id
    const _id = new ObjectId(DelateID)

    let ChackAssociate = await ChackAssociateService({ CetagoryID: _id }, ProductsModel)
    console.log(ChackAssociate)
    if (ChackAssociate) {
        res.status(200).json({ stutas: "Associat", data: "Associat with Product" })
    } else {
        let result = await DelateService(req, SessionCollectionModel)
        res.status(200).json(result)
    }
}
exports.SessionCollectionDetailsById = async (req, res) => {
    let result = await DetailsById(req, SessionCollectionModel)
    res.status(200).json(result)
}

