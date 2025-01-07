class errorHandler extends Error
{
    constructor(message = "Something went wrong", statusCode,errors=[],stack="" )
    {
        super(message)
        this.message=message
        this.statusCode = statusCode
        // this.success = success
        this.data = null
        this.errors = errors

        if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {errorHandler}



