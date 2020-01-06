const express = require("express")
const db = require("../data/db-config.js")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    res.json(await db("users"))
  } catch(err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await db("users").where({ id }).first()

    if (user) {
      res.json(user)
    } else {
      res.status(404).json({
        message: "Could not find user with given ID",
      })
    }
  } catch(err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const [id] = await db("users").insert(req.body)
    res.status(201).json(await db("users").where({ id }).first())
  } catch(err) {
    next(err)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedCount = await db("users").where({ id }).update(req.body)

    if (updatedCount) {
      res.json(await db("users").where({ id }).first())
    } else {
      res.status(404).json({ message: "Could not find user with given id" })
    }
  } catch(err) {
    next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedCount = await db("users").where({ id }).del()

    if (deletedCount) {
      res.status(204).end()
    } else {
      res.status(404).json({
        message: "Could not find user with given ID",
      })
    }
  } catch(err) {
    next(err)
  }
})

module.exports = router