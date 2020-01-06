const express = require("express")
const helmet = require("helmet")
const UserRouter = require("./users/user-router.js")

const server = express()
const port = process.env.port || 4000

server.use(helmet())
server.use(express.json())

server.use("/api/users", UserRouter)

server.use((err, req, res, next) => {
	console.log("Error:", err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
