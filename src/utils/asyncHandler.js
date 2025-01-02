const asyncHandler = (fn)=> async(req,res,next)=>{
    try {
        await fn(req,res,next)
    } catch (error) {
        console.log("There cant be this type file" + error),
        res.status(err.code||500).json({
            message: err.message,
            success: false
        })
    }

}

