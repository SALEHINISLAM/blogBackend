import express,{ Application, Request, Response } from "express";
import cors from 'cors'
import router from "./Routes";
import notFound from "./middleware/notFound";
import globalErrorHandler from "./middleware/globalErrorHandler";



const app:Application=express();

//parsers
app.use(express.json())
app.use(cors())

//application routers
app.use('/api',router)

//for not found
app.use(notFound)

const test=async(req:Request, res:Response)=>{
res.send("server is running")
}

app.get('/', test)
//handling error
app.use(globalErrorHandler)

export default app;
