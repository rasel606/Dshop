
const jwt = require('jsonwebtoken')
const ChackAssociateService = require("../services/ChackAssociateService");
const DelateService = require("../services/DeleteService");
const PurchasesProductModel = require("../models/PurchasesProductModel/PurchasesProductModel");
const { ObjectId } = require("mongodb");
const DetailsById = require("../services/DetailsById");
const UsersModel = require("../models/UsersModel");

exports.registation = (req, res) => {
    let reqBody = req.body;

    UsersModel.create(reqBody)
        .then((data) => {

            if (!data) {
                res.status(400).json({ status: "fail", data: "err" })
            } else {
                res.status(200).json({ status: "success", data: data })
            }
        })
}


//login

exports.login = (req, res) => {


    let email = req.body["email"]


    // UsersModel.project({ email: email, password: password })
    UsersModel.aggregate([
        { $match: { email: email } },
        {
            $project: {
                email: 1,
                firstName: 1,
                photo: 1,
                mobile: 1,
                address: 1,
                role: 1
            }
        }
    ])
        .then((data) => {
            if (!data) {
                res.status(400).json({ status: "fail", data: "err" })
            } else {
                if (data.length > 0) {

                    let Payload = {
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                        data: data[0].email,

                    }

                    let token = jwt.sign(Payload, `${data[0]?.email}`);

                    res.status(200).json({ status: "success", token, data })
                }
                else {
                    res.status(400).json({ status: "fail", data: "err" })
                }
            }
        })
}


exports.UserProfile = async (req, res) => {
    let userEmail = req.headers["email"]

    const data = await UsersModel.aggregate([
        { $match: { email: userEmail } },
        {
            $project: {
                email: 1,
                firstName: 1,
                photo: 1,
                mobile: 1,
                address: 1
            }
        }
    ])
    if (!data) {
        res.status(400).json({ status: "fail", data: "err" })
    } else {
        res.status(200).json({ status: "success", data: data })
    }

}
exports.AllUser = (req, res) => {
    let userEmail = req.headers["email"]

    UsersModel.find()
        .then((data) => {

            if (!data) {
                res.status(400).json({ status: "fail", data: "err" })
            } else {
                res.status(200).json({ status: "success", data: data })
            }
        })
}


//update profile


exports.profileUpdate = (req, res) => {
    let reqBody = req.body;
    let userEmail = req.headers["email"]

    UsersModel.updateOne({ email: userEmail }, { $set: reqBody }, { upsert: true })
        .then((data) => {
            console.log(data)
            if (!data) {
                res.status(400).json({ status: "fail", data: "err" })
            } else {
                res.status(200).json({ status: "success", data: data })
            }
        })


}
exports.MakeAdmin = async (req, res) => {
    const email = req.params.email
    const reqEmail = req.headers.decoded
    const filter = { email: email }
    console.log(filter)
    const UpdateDoc = { $set: { role: "Admin" } }


    await UsersModel.findOneAndUpdate(filter, UpdateDoc, { upsert: true })
        .then((data) => {
            console.log(data)
            if (data) {
                res.status(200).json({ status: "success", data: data })
            } else {

                res.status(400).json({ status: "fail", data: "err" })
            }
        })
}
exports.UserPhotoChange = async (req, res) => {
    const email = req.headers.email
    const filter = { email: email }
    const photo = req.body

    const UpdateDoc = { $set: photo }

    console.log(email, photo)
    await UsersModel.findOneAndUpdate(filter, UpdateDoc, { upsert: true })
        .then((data) => {
            console.log(data)
            if (data) {
                res.status(200).json({ status: "success", data: data })
            } else {

                res.status(400).json({ status: "fail", data: "err" })
            }
        })
}

exports.removeAdmin = async (req, res) => {
    const email = req.params.email
    const filter = { email: email }
    console.log(filter)
    const UpdateDoc = { $set: { role: "user" } }


    await UsersModel.findOneAndUpdate(filter, UpdateDoc, { upsert: true })
        .then((data) => {

            if (!data) {
                res.status(400).json({ status: "fail", data: "err" })
            } else {
                res.status(200).json({ status: "success", data: data })
            }
        })
}

exports.profiledelate = async (req, res) => {

    let DelateID = req.params.id
    const id = new ObjectId(DelateID)

    let ChackAssociate = await ChackAssociateService({ userId: id }, PurchasesProductModel)

    if (ChackAssociate) {
        res.status(200).json({ stutas: "Associat", data: "Associat with Product" })
    } else {
        let result = await DelateService(req, UsersModel)
        res.status(200).json(result)
    }
}

exports.profileDetailsById = async (req, res) => {
    let result = await DetailsById(req, UsersModel)
    res.status(200).json(result)
}