import dotenv from "dotenv"
import dbConnection from "./db/dbConnect.js"
import { app } from "./app.js"

dotenv.config({
    path:'.\.env'
})

dbConnection()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`app started listening at ${process.env.PORT||8000} port`)
    })
}
)
.catch((error)=>{
    console.log("Database connection has been failed",error)
    // process.exit(1);

})

