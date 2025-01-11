import express,{ Application, Request, Response } from "express";
import cors from 'cors'
import router from "./app/Routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";


const app:Application=express();

//parsers
app.use(express.json())
app.use(cors())

//application routers
app.use('/api',router)

const test=async(req:Request, res:Response)=>{
res.send("server is running")
}

app.get('/', test)
//handling error
app.use(globalErrorHandler)

//for not found
app.use(notFound)
export default app;

/*
jd9NG5eBEaO7TT2F
blogBackend
*/