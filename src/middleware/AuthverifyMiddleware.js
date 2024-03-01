const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {


    let email = req.headers["email"]
    let token = req.headers["tokenkey"]


    jwt.verify(token, email, function (err, decoded) {

        if (err) {
            res.status(400).json({ status: "fail", data: "unauthorize" })
        } else {
            let email = decoded.data

            req.headers.email = email
            req.headers.decoded = email

            next()
        }
    })
}