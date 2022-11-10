var express = require("express")
const bcrypt = require("bcrypt")
var router = express.Router()
var User = require("../models/index").User
const saltRounds = 8

router.get("/", async function (req, res, next) {
  let allUsers = await User.findAll()
  return res.send(allUsers)
})

router.post("/", async function (req, res, next) {
  try {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      if (!err) {
        await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        })
        return res.status(200).send("User created")
      } else {
        return res.status(400).send("Error creating user")
      }
    })
  } catch (err) {
    return res.status(400).send(err)
  }
})

module.exports = router
