const express = require('express');
const router = require('./src/routes/api');

const app = new express()



//middleware
const rateLimit = require('express-rate-limit')
const helmet = require('helmet');
const mongoose = require('mongoose');
const hpp = require('hpp')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors')
const bodyParser = require('body-parser')

const stripe = require("stripe")('sk_test_51OJFtaJGJZCx19l2hj8goxXm6PV9pkFiTEBL5WaoT3miSrwCixptlGfHrikiBWlbfwz2xK7Rp3IpiuqOSeGB7BsN00xqfWW4uI');

app.use(express.static("public"));
app.use(express.json());




app.use(cors({
        origin:"*",
        allowHeaders:"*",
        allowMethods:"*"
        
}))
app.use(mongoSanitize())
app.use(helmet())
app.use(hpp())
app.use(xss())
app.use(bodyParser.json())


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})



app.use(limiter)


//mongodb database connection
let options = { user: "SaikatDbUser", pass: "Saikat125623" }
let URI = `mongodb+srv://${options.user}:${options.pass}@cluster0.nepkezv.mongodb.net/?retryWrites=true&w=majority`





mongoose.connect(URI)
    .then(() => {
        console.log("connect")
    })


app.use("/api/v1", router);

// app.use("*", (req, res) => {
//     res.status(404).json({ status: "Fail", data: "Data not found" })
// });



module.exports = app
