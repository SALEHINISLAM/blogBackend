import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
    //extract value within double quotes using regex
    const match= err.message.match(/"([^"]*)"/)
    const extractedMessage= match && match[1]
    const statusCode = 400
    const errorSources: TErrorSource = [{
        path: '',
        message: `${extractedMessage} is already exists`,
    }]
    return { statusCode, message: "Invalid ID", errorSources }
}

export default handleDuplicateError