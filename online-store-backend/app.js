require("dotenv").config()

const express = require("express")
const chalk = require("chalk")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const routes = require("./routes")

const port = 3000
const app = express()

const cors = require("cors")

app.use(express.static("../Online-store-frontend/dist"))

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use(cookieParser())
app.use(express.json())

app.use("/api", routes)

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(
      chalk.green.bold.inverse(`Server has been started on port ${port}...`)
    )
  })
})
