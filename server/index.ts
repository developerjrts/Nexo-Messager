import dotenv from "dotenv"
import ConnectDB from "./src/config/db.js";
import type { Request, Response } from "express";
dotenv.config()

import app from "./src/app.js"; 
import router from "./src/routes/router.js";

const port: number = Number(process.env.PORT) || 5000

app.use("/api", router)

ConnectDB().then(() => {
    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    })
})