const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');

module.exports = async (req, res, next) => {

    let AdminChack = req.headers.decoded

    let quary = { email: AdminChack }

    await UsersModel.findOne(quary)
        .then((data) => {
            if (data?.role !== "Admin") {
                res.status(400).json({ status: "fail", data: "err" })
            }

        })
    next()
}