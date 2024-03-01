const AddTOCardModel = require("../../models/AddTOCardModel");
const DeleteService = require("../../services/DeleteService");
const CreateService = require("../../services/CreateService");
const AddTOCardDetails = require("../../services/AddtoCardDetails");



exports.CreateAddTOCard = async (req, res) => {
    const reqBody = req.Body
    console.log(req.body)
    let result = await AddTOCardModel.insertMany(reqBody)
    res.status(200).json(result)
}

exports.AddTOCardDetailsByEmail = async (req, res) => {
    let result = await AddTOCardDetails(req, AddTOCardModel)
    res.status(200).json(result)
}


exports.DeleteAddTOCard = async (req, res) => {
    let result = await DeleteService(req, AddTOCardModel)
    res.status(200).json(result)
}