const BrandModel = require("../../models/BrandModel");
const ProductsModel = require("../../models/ProductsModel");
const CreateService = require("../../services/CreateService");
const UpDateService = require("../../services/UpdateService");
const DropDownService = require("../../services/DropDownService");
const ListViewService = require("../../services/ListService");
const DelateService = require("../../services/DeleteService");
const { ObjectId } = require("mongodb");
const ChackAssociateService = require("../../services/ChackAssociateService");
const DetailsById = require("../../services/DetailsById");

exports.CreateBrand = async (req, res) => {
    let result = await CreateService(req, BrandModel)
    res.status(200).json(result)
}

exports.UpdateBrand = async (req, res) => {
    let result = await UpDateService(req, BrandModel)
    res.status(200).json(result)
}

exports.Brand = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }

    let SearchArray = [{ BrandName: SearchRgx }]
    let result = await ListViewService(req, BrandModel, SearchArray)
    res.status(200).json(result)
}

exports.BrandDropDown = async (req, res) => {
    let result = await DropDownService(req, BrandModel, { _id: 1, BrandName: 1, BrandImage: 1 }, { BrandName: 1 })
    res.status(200).json(result)
}
exports.BrandDetailsById = async (req, res) => {
    let result = await DetailsById(req, BrandModel)
    res.status(200).json(result)
}


exports.Branddelate = async (req, res) => {

    let DelateID = req.params.id
    const _id = new ObjectId(DelateID)

    let ChackAssociate = await ChackAssociateService({ BrandID: _id }, ProductsModel)
    if (ChackAssociate) {
        res.status(200).json({ stutas: "Associat", data: "Associat with Product" })

    } else {
        let result = await DelateService(req, BrandModel)
        res.status(200).json(result)
    }


}