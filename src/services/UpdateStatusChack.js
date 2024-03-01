const { ObjectId } = require("mongodb");


const UpdateStatusChack = async (req, AssociateModel, Joint1) => {

    try {
        let Status = req.params
        console.log(req.params)
        const email = req.headers["email"]
        let data = await AssociateModel?.aggregate([
            { $match: Status },
            Joint1,

        ])

        return data

    } catch (error) {
        return false
    }
};


module.exports = UpdateStatusChack;