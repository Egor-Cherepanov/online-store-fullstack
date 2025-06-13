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

// require("dotenv").config()

// const express = require("express")
// const chalk = require("chalk")
// const mongoose = require("mongoose")
// const cookieParser = require("cookie-parser")
// const cors = require("cors")
// const path = require("path")
// const routes = require("./routes")

// const port = 3000
// const app = express()

// // CORS настройки (обнови origin, если фронт в продакшене)
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// )

// app.use(cookieParser())
// app.use(express.json())

// // ===== СТАТИКА ФРОНТЕНДА =====
// // После сборки фронта (npm run build), Express будет отдавать dist
// app.use(express.static("../Online-store-frontend/dist"))

// // ===== API РОУТЫ =====
// app.use("/api", routes)

// // ===== SPA fallback (index.html для любых маршрутов) =====
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve("../Online-store-frontend/dist/index.html"))
// })

// // ===== Подключение к MongoDB и запуск сервера =====
// mongoose
//   .connect(process.env.DB_CONNECTION_STRING)
//   .then(() => {
//     app.listen(port, () => {
//       console.log(chalk.green.bold.inverse(`Server started on port ${port}...`))
//     })
//   })
//   .catch((err) => {
//     console.error(chalk.red("MongoDB connection error:"), err)
//   })
