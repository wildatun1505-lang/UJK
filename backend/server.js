import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import siswaRoutes from "./routes/siswaRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(siswaRoutes)

const PORT = 8000
app.listen(PORT, () => {
console.log("server berjalan di http://localhost:${PORT}");
})