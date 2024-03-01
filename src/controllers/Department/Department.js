const DepartmentModels = require("../../models/DepartmentModel");
const CreateService = require("../../services/CreateService");
const UpDateService = require("../../services/UpdateService");
const DropDownService = require("../../services/DropDownService");
const DelateService = require("../../services/DeleteService");
const DetailsById = require("../../services/DetailsById");
const { ObjectId } = require("mongodb");

exports.CreateDepartment = async (req, res) => {
    let result = await CreateService(req, DepartmentModels)
    res.status(200).json(result)
}

exports.UpdateDepartment = async (req, res) => {
    let result = await UpDateService(req, DepartmentModels)
    res.status(200).json(result)
}


exports.DepartmentDropDown = async (req, res) => {
    let result = await DropDownService(req, DepartmentModels, { _id: 1, DepartmentImage: 1, DepartmentName: 1 }, { DepartmentImage: 1 })
    res.status(200).json(result)
}

exports.Departmentdelate = async (req, res) => {

    let result = await DelateService(req, DepartmentModels)
    res.status(200).json(result)

}
exports.DepartmentDetailsById = async (req, res) => {
    let result = await DetailsById(req, DepartmentModels)
    res.status(200).json(result)
}
