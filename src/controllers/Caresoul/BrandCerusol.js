const CarosulModel = require("../../models/CarosulModel");
const CreateService = require("../../services/CreateService");
const UpDateService = require("../../services/UpdateService");
const DropDownService = require("../../services/DropDownService");
const DelateService = require("../../services/DeleteService");
const DetailsById = require("../../services/DetailsById");
const { ObjectId } = require("mongodb");
const ProductsModel = require("../../models/ProductsModel");

exports.CreateCarosul = async (req, res) => {
    let result = await CreateService(req, CarosulModel)
    res.status(200).json(result)
}

exports.UpdateCarosul = async (req, res) => {
    let result = await UpDateService(req, CarosulModel)
    res.status(200).json(result)
}


exports.CarosulDropDown = async (req, res) => {
    let result = await DropDownService(req, CarosulModel, { _id: 1, CarosulModelImage: 1 }, { CarosulModelImage: 1 })
    res.status(200).json(result)
}

exports.Carosuldelate = async (req, res) => {

    let DelateID = req.params.id
    const _id = new ObjectId(DelateID)
    console.log(_id)


    let result = await DelateService(req, CarosulModel)
    res.status(200).json(result)

}
exports.CarosulDetailsById = async (req, res) => {
    let result = await DetailsById(req, CarosulModel)
    res.status(200).json(result)
}
