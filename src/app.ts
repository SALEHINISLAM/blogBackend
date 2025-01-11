import express,{ Application } from "express";
import cors from 'cors'
import router from "./app/Routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";


const app:Application=express();

//parsers
app.use(express.json())
app.use(cors())

//application routers
app.use('/api/v1',router)

app.get('/', function (req, res) {
    res.send('Hello World')
  })
//handling error
app.use(globalErrorHandler)

//for not found
app.use(notFound)
export default app;