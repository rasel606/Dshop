const PurchasesProductModel = require("../models/PurchasesProductModel/PurchasesProductModel")
const PurchasesModel = require("../models/PurchasesProductModel/purchasesModel")

const PurchasesByDate = async (Requst) => {


    try {

        let email = Requst.headers["email"]
        let FromDate = Requst.body["FromDate"]
        let ToDate = Requst.body["ToDate"]
        console.log(Requst.body)

        let data = await PurchasesProductModel.aggregate([

            { $match: { email: email, CreatedDate: { $gte: new Date(FromDate), $lte: new Date(ToDate) } } },
            {
                $facet: {
                    Total: [{
                        $group: {
                            _id: 0,
                            TotalAmount: { $sum: "$GrandTotal" },
                            count: { $sum: 1 }
                        }
                    }],
                    Last300Days: [
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$CreatedDate" } },
                                TotalAmount: { $sum: "$GrandTotal" },
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    Rows: [
                        { $lookup: { from: "purchasesmodels", localField: "_id", foreignField: "PurchasesId", as: "Purchases" } }
                    ]
                }
            }
        ])
        return { stutas: "Success", data: data }
    } catch (error) {
        return { stutas: "Error", data: error.toString() }
    }
}
module.exports = PurchasesByDate