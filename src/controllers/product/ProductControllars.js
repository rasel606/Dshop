const CreateService = require("../../services/CreateService");
const UpDateService = require("../../services/UpdateService");

const DelateService = require("../../services/DeleteService");
const ProductsModel = require("../../models/ProductsModel");
const purchasesModel = require("../../models/PurchasesProductModel/purchasesModel");
const ChackAssociateService = require("../../services/ChackAssociateService");
const { ObjectId } = require("mongodb");
const DetailsById = require("../../services/DetailsById");
const ProductListTwoService = require("../../services/ProductListView");
const MatchProduct = require("../../services/MatchProducts");
const ProductDetailsById = require("../../services/ProductDetailsById");

exports.CreateProduct = async (req, res) => {
    console.log(req.body)
    let result = await CreateService(req, ProductsModel)

    res.status(200).json(result)
}

exports.UpdateProduct = async (req, res) => {

    let result = await UpDateService(req, ProductsModel)
    res.status(200).json(result)
}


exports.Product = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let Joint1 = { $lookup: { from: "brandmodels", localField: "BrandID", foreignField: "_id", as: "Brands" } }
    let Joint2 = { $lookup: { from: "cetagorymodels", localField: "CetagoryID", foreignField: "_id", as: "categorys" } }

    let SearchArray = [{ title: SearchRgx }]
    let result = await ProductListTwoService(req, ProductsModel, SearchArray, Joint1, Joint2)
    res.status(200).json(result)
}
exports.Productdelate = async (req, res) => {
    let DelateID = req.params.id
    const id = new ObjectId(DelateID)


    let ChackAssociate = await ChackAssociateService({ ProductId: id }, purchasesModel)


    if (ChackAssociate) {
        res.status(200).json({ stutas: "Associat", data: "Associat with purchases" })
    } else {
        let result = await DelateService(req, ProductsModel)
        res.status(200).json(result)
    }

}
exports.ProductDetailsById = async (req, res) => {
    let Joint1 = { $lookup: { from: "brandmodels", localField: "BrandID", foreignField: "_id", as: "Brands" } }
    let Joint2 = { $lookup: { from: "cetagorymodels", localField: "CetagoryID", foreignField: "_id", as: "categorys" } }
    let result = await ProductDetailsById(req, ProductsModel, Joint1, Joint2)
    res.status(200).json(result)
}

exports.ProductDetailsByCetegory = async (req, res) => {

    let DelateID = req.params.id

    const id = new ObjectId(DelateID)


    const QueryObject = { CetagoryID: id }
    console.log(QueryObject)


    let Product = await MatchProduct(QueryObject, ProductsModel)
    res.status(200).json(Product)


}
exports.ProductDetailsByBrand = async (req, res) => {

    let DelateID = req.params.id

    const id = new ObjectId(DelateID)


    const QueryObject = { BrandID: id }


    let Product = await MatchProduct(QueryObject, ProductsModel)
    res.status(200).json(Product)


}
exports.ProductsBySessionCollection = async (req, res) => {

    let DelateID = req.params.name

    // const id = new ObjectId(DelateID)
    console.log(DelateID)


    const QueryObject = { SessionCollectionName: DelateID }


    let Product = await MatchProduct(QueryObject, ProductsModel)
    res.status(200).json(Product)


}
exports.ProductsSortByPrice = async (req, res) => {



    let data = await ProductsModel.aggregate(
        [


            { $sort: { price: -1 } }

        ]
    )
    res.status(200).json(data)


}