
const { ObjectId } = require("mongodb");
const TodoModel = require("../models/TodoModel");
const jwt = require('jsonwebtoken');

exports.TodoCreate = (req, res) => {

    let userEmail = req.headers["email"]
    let TodoName = req.body["TodoName"]
    let TodoDescription = req.body["TodoDescription"]
    let TodoStatus = "New"
    let PostBody = {
        email: userEmail,
        TodoName: TodoName,
        TodoDescription: TodoDescription,
        TodoStatus: TodoStatus,

    }

    TodoModel.create(PostBody)
        .then((data) => {
            console.log(data)
            if (!data) {
                res.status(400).json({ status: "fail", data: "err" })
            } else {
                res.status(200).json({ status: "success", data: data })
            }
        })
}

exports.Todo = (req, res) => {
    let userEmail = req.headers["email"]

    TodoModel.find({})
        .then((data) => {

            if (!data) {
                res.status(400).json({ status: "fail", data: "err" })
            } else {
                res.status(200).json({ status: "success", data: data })
            }
        })
}


exports.TodoFilterStatus = (req, res) => {
    let userEmail = req.headers["email"]
    let TodoStatus = req.body["TodoStatus"]

    console.log(TodoStatus)

    TodoModel.find({ email: userEmail, TodoStatus: TodoStatus })
        .then((data) => {
            console.log(data)

            if (!data) {
                res.status(400).json({ status: "fail", data: "err" })
            } else {

                res.status(200).json({ status: "success", data: data })
            }
        })
}


exports.TodoUpdate = (req, res) => {
    let id = req.params.id
    console.log(req.body)

    let userEmail = req.headers["email"]
    let TodoName = req.body.TodoName
    let TodoDescription = req.body.TodoDescription
    let TodoUpdateDate = Date.now()

    let PostBody = {

        TodoName: TodoName,
        TodoDescription: TodoDescription,
        TodoUpdateDate: TodoUpdateDate

    }


    TodoModel.updateOne({ _id: new ObjectId(id) }, { $set: PostBody }, { upsert: true })
        .then((data) => {

            if (!data) {
                res.status(400).json({ status: "fail", data: "err" })
            } else {
                res.status(200).json({ status: "success", data: data })
            }
        })

}


exports.UpdateStatusTodo = (req, res) => {
    console.log(req.body)
    let id = req.params.id
    let TodoStatus = req.body.TodoStatus
    let PostBody = {

        TodoStatus: TodoStatus,


    }


    TodoModel.updateOne({ _id: new ObjectId(id) }, { $set: PostBody }, { upsert: true })
        .then((data) => {

            if (!data) {
                res.status(400).json({ status: "fail", data: "err" })
            } else {
                res.status(200).json({ status: "success", data: data })
            }
        })
}