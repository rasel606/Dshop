const UsersModel = require("../models/UsersModel");
const jwt = require('jsonwebtoken');

exports.AdminRole = (req, res) => {
    let email = req.params.email;
    let AdminChack = req.headers.decoded
    console.log(AdminChack)
    UsersModel.findOne({ email: email })
        .then((data) => {
            if (data) {

                if (AdminChack === data?.email) {


                    if (data?.role === "Admin") {
                        const result = { Admin: data?.role === "Admin" }
                        res.status(200).json({ status: "success", data: result })
                    } else {
                        const result = { Admin: false }
                        res.status(200).json({ status: "success", data: result })
                    }

                }
            }
        })
}


