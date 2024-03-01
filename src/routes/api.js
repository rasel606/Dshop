const express = require('express')
const router = express.Router()
const UserControler = require("../controllers/UserControler")
const AdminRole = require("../middleware/AdminRole")


const AuthverifyMiddleware = require("../middleware/AuthverifyMiddleware")
const BrandsControllers = require('../controllers/Brands/BrandsControllers')
const SessionControllers = require('../controllers/Session/SessionController')
const categoryControllers = require('../controllers/cetegory/categoryControllers')
const ProductControllers = require('../controllers/product/ProductControllars')
const ReviewController = require('../controllers/Review/ReviewController')
const PurchsesController = require('../controllers/PurchsesController/PurchsesController')
const AddTOCard = require('../controllers/AddTOCard/AddTOCard')
const VerifyAdmin = require('../middleware/VerifyAdmin')
const BrandCarosol = require('../controllers/Caresoul/BrandCerusol')
const Department = require('../controllers/Department/Department')
const Payment = require('../controllers/Payment/Payment')




//user

router.post("/registation", UserControler.registation)
router.post("/profileupdate", AuthverifyMiddleware, UserControler.profileUpdate)
router.post("/jwt", UserControler.login)
router.get("/userprofile", AuthverifyMiddleware, UserControler.UserProfile)
router.post("/user/admin/:email", AuthverifyMiddleware, UserControler.MakeAdmin)
router.get("/user/chackadmin/:email", AuthverifyMiddleware, AdminRole.AdminRole)
router.post("/user/removeadmin/:email", AuthverifyMiddleware, VerifyAdmin, UserControler.removeAdmin)
router.get("/users", AuthverifyMiddleware, VerifyAdmin, UserControler.AllUser)
router.get("/userdelete/:id", AuthverifyMiddleware, UserControler.profiledelate)
router.post("/userphotochange", AuthverifyMiddleware, UserControler.UserPhotoChange)
router.post("/create-payment-intent", Payment.Payment)

// todo
// router.post("/todocreate", AuthverifyMiddleware, TodoListControllers.TodoCreate)
// router.post("/todoupdate/:id", AuthverifyMiddleware, TodoListControllers.TodoUpdate)
// router.post("/todoupdatestatus/:id", AuthverifyMiddleware, TodoListControllers.UpdateStatusTodo)
// router.get("/todofillterstatus", AuthverifyMiddleware, TodoListControllers.TodoFilterStatus)
// router.get("/todo", AuthverifyMiddleware, TodoListControllers.Todo)
//brand
router.post("/brandcreate", AuthverifyMiddleware, BrandsControllers.CreateBrand)
router.post("/brandupdate/:id", AuthverifyMiddleware, BrandsControllers.UpdateBrand)
router.get("/brandList/:pageNo/:parPage/:searchKeyword", BrandsControllers.Brand)
router.get("/branddropdown", BrandsControllers.BrandDropDown)
router.get("/branddelete/:id", AuthverifyMiddleware, BrandsControllers.Branddelate)
router.get("/branddetails/:id", AuthverifyMiddleware, BrandsControllers.BrandDetailsById)
//sessionCollection

router.post("/sessioncollectioncreate", AuthverifyMiddleware, SessionControllers.CreateSessionCollection)
router.post("/sessioncollectionupdate/:id", AuthverifyMiddleware, SessionControllers.UpdateSessionCollection)
router.get("/sessioncollection/:pageNo/:parPage/:searchKeyword", SessionControllers.SessionCollection)
router.get("/sessioncollectiondropdown", SessionControllers.SessionCollectionDropDown)
router.get("/sessioncollectiondelete/:id", AuthverifyMiddleware, SessionControllers.SessionCollectiondelate)
router.get("/sessioncollectiondetails/:id", AuthverifyMiddleware, SessionControllers.SessionCollectionDetailsById)
//category
router.post("/categorycreate", AuthverifyMiddleware, categoryControllers.CreateCetagory)
router.post("/categoryupdate/:id", AuthverifyMiddleware, categoryControllers.UpdateCetagory)
router.get("/categoryList/:pageNo/:parPage/:searchKeyword", categoryControllers.Cetagory)
router.get("/categorydropdown", categoryControllers.CetagoryDropDown)
router.get("/categorydelete/:id", AuthverifyMiddleware, categoryControllers.Cetagorydelate)
router.get("/categorydetails/:id", AuthverifyMiddleware, categoryControllers.CetagoryDetailsById)

//Brand crasol
router.post("/carosulcreate", AuthverifyMiddleware, BrandCarosol.CreateCarosul)
router.post("/carosulupdate/:id", AuthverifyMiddleware, BrandCarosol.UpdateCarosul)
router.get("/carosuldropdown", BrandCarosol.CarosulDropDown)
router.get("/carosuldelete/:id", AuthverifyMiddleware, BrandCarosol.Carosuldelate)
router.get("/carosuldetails/:id", AuthverifyMiddleware, BrandCarosol.CarosulDetailsById)


//Department 
router.post("/departmentcreate", AuthverifyMiddleware, Department.CreateDepartment)
router.post("/departmentupdate/:id", AuthverifyMiddleware, Department.UpdateDepartment)
router.get("/departmentdropdown", Department.DepartmentDropDown)
router.get("/departmentdelete/:id", AuthverifyMiddleware, Department.Departmentdelate)
router.get("/departmentdetails/:id", AuthverifyMiddleware, Department.DepartmentDetailsById)


// review 

router.post("/reviewcreate/:id", AuthverifyMiddleware, ReviewController.CreateReview)
router.post("/reviewupdate/:id", AuthverifyMiddleware, ReviewController.UpdateReview)
router.get("/review/:id", ReviewController.Review)
//Product
router.post("/productcreate", AuthverifyMiddleware, ProductControllers.CreateProduct)
router.post("/productupdate/:id", AuthverifyMiddleware, ProductControllers.UpdateProduct)
router.get("/productdelete/:id", AuthverifyMiddleware, ProductControllers.Productdelate)
router.get("/productdetails/:id", ProductControllers.ProductDetailsById)
router.get("/productdelete/:id", AuthverifyMiddleware, ProductControllers.Productdelate)

router.get("/productcetegory/:id", ProductControllers.ProductDetailsByCetegory)
router.get("/productbrand/:id", ProductControllers.ProductDetailsByBrand)
router.get("/productSessionCollection/:name", ProductControllers.ProductsBySessionCollection)
router.get("/productsortbyprice", ProductControllers.ProductsSortByPrice)
router.get("/productList/:pageNo/:parPage/:searchKeyword", ProductControllers.Product)
//purchses
router.post("/purchsescreate", AuthverifyMiddleware, PurchsesController.CreatePurchses)
router.get("/purchsesdelate/:id", AuthverifyMiddleware, PurchsesController.DeletePurchses)
router.get("/purchseslist/:pageNo/:parPage/:searchKeyword", PurchsesController.Purchses)
router.get("/purchsesdetails/:id", AuthverifyMiddleware, PurchsesController.PurchsesDetailsById)
router.post("/purchsesupdatestatus/:id", AuthverifyMiddleware, PurchsesController.UpdatePurchsesStatus)
router.get("/purchsesstatus/:Status", AuthverifyMiddleware, PurchsesController.PurchsesStatus)
router.get("/purchsesreport", AuthverifyMiddleware, PurchsesController.PurchsesReport)
router.get("/purchsesclient", AuthverifyMiddleware, PurchsesController.PurchsesClientOrder)
router.get("/purchsesstatusreport", AuthverifyMiddleware, PurchsesController.PurchsesStatusCount)
router.get("/purchsesmonthlyreport", AuthverifyMiddleware, PurchsesController.PurchsesMonthlyReportsell)
//AddToCARD
router.post("/addtocardcreate", AuthverifyMiddleware, AddTOCard.CreateAddTOCard)
router.get("/add-to-card-delate/:id", AuthverifyMiddleware, AddTOCard.DeleteAddTOCard)
router.get("/add-to-card-list/email/:email", AuthverifyMiddleware, AddTOCard.AddTOCardDetailsByEmail)



module.exports = router