const ReviewModel = require("../../models/ReviewModel");

const UpDateService = require("../../services/UpdateService");
const DropDownService = require("../../services/DropDownService");
const DelateService = require("../../services/DeleteService");
const ChackAssociateService = require("../../services/ChackAssociateService");
const DetailsById = require("../../services/DetailsById");
const { ObjectId } = require("mongodb");


exports.CreateReview = async (req, res) => {
    try {
        let PostBody = req.body
        let Postid = req.params.id
        console.log(PostBody)
        PostBody.email = req?.headers["email"]
        PostBody.ReviewProductId = Postid
        let ChackAssociate = await ChackAssociateService({ email: PostBody.email, ReviewProductId: PostBody.ReviewProductId }, ReviewModel)

        console.log(PostBody)
        if (ChackAssociate) {
            res.status(200).json({ stutas: "Associat", data: "Already Reviewed" })
        } else {

            let data = await ReviewModel.create(PostBody)

            res.status(200).json({ status: "success", data: data })
        }
    }
    catch (error) {
        return { status: "Fail", data: error.toString() }
    }

}

exports.UpdateReview = async (req, res) => {
    // let result = await UpDateService(req, cetagoryModel)
    // res.status(200).json(result)
}

exports.Review = async (req, res) => {
    const id = req.params.id
    const Id = id.toString()
    console.log(Id)
    let Joint1 = {
        $lookup: {
            from: "users",
            let: { email: "$email" },
            pipeline: [
                {
                    $match:
                    {
                        $expr:
                        {
                            $and:
                                [
                                    { $eq: ["$email", "$$email"] },

                                ]
                        }
                    }
                },
                { $project: { firstName: 1, _id: 0, photo: 1 } }
            ],
            as: "profile"
        }
    }

    data = await ReviewModel.aggregate([
        { $match: { ReviewProductId: Id } },
        Joint1,
        {
            $facet: {
                // Total: [{ $match: { ReviewProductId: Id } }, { $count: "count" }],
                row: [{ $match: { ReviewProductId: Id } }]
            }
        }
    ])
    res.status(200).json({ status: "success", data: data })
}

// exports.AvrageRatting = async () => {
//     const id = req.params.id
//     const Id = id.toString()
//     data = await ReviewModel.aggregate([
//         {
//             {
//        $group:
//          {
//            _id: "$item",
           
//            avgQuantity: { $avg: "$quantity" }
//          }
//      }
//         }
//     ])
// }