const cetagoryModel = require("../../models/categoryModel");
const CreateService = require("../../services/CreateService");
const UpDateService = require("../../services/UpdateService");
const DropDownService = require("../../services/DropDownService");
const ListViewService = require("../../services/ListService");
const DelateService = require("../../services/DeleteService");
const ChackAssociateService = require("../../services/ChackAssociateService");
const DetailsById = require("../../services/DetailsById");
const { ObjectId } = require("mongodb");
const ProductsModel = require("../../models/ProductsModel");

exports.CreateCetagory = async (req, res) => {
    let result = await CreateService(req, cetagoryModel)
    res.status(200).json(result)
}

exports.UpdateCetagory = async (req, res) => {
    let result = await UpDateService(req, cetagoryModel)
    res.status(200).json(result)
}

exports.Cetagory = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }

    let SearchArray = [{ CetagoryName: SearchRgx }]
    let result = await ListViewService(req, cetagoryModel, SearchArray)
    res.status(200).json(result)
}

exports.CetagoryDropDown = async (req, res) => {
    let result = await DropDownService(req, cetagoryModel, { _id: 1, CetagoryName: 1, CetagoryImage: 1 }, { CetagoryName: 1 })
    res.status(200).json(result)
}

exports.Cetagorydelate = async (req, res) => {

    let DelateID = req.params.id
    const _id = new ObjectId(DelateID)

    let ChackAssociate = await ChackAssociateService({ CetagoryID: _id }, ProductsModel)
    console.log(ChackAssociate)
    if (ChackAssociate) {
        res.status(200).json({ stutas: "Associat", data: "Associat with Product" })
    } else {
        let result = await DelateService(req, cetagoryModel)
        res.status(200).json(result)
    }
}
exports.CetagoryDetailsById = async (req, res) => {
    let result = await DetailsById(req, cetagoryModel)
    res.status(200).json(result)
}



