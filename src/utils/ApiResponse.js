class successHandler
{
    constructor(message, statusCode , success="true", data)
    {
        this.message= message
        this.statusCode = statusCode
        this.success=statusCode<400
        this.data=data


    }

}

export {successHandler}