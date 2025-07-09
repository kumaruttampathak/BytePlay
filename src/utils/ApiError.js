class ApiError extends Error{
    constructor(
        statusCode,
        message= "Something went wrong",
        errors =[],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null // creates the data as object property which is set to be null
        this.message = message
        this.success = false // we are handling the case of api error so it should be false
        this.errors = errors

        if(stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor) // to track the origin of errors
        }
    }
}

export {ApiError}