import mongoose ,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new Schema
(
    {
        userName:{
            type: String,
            required: true,
            lowercase: true,
            trim:true,
            unique:true,
            index:true
        },
        fullName:{
            type: String,
            required: true,
            trim:true,
        },
        password:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique:true
        },
        avatar:{
            type:String
        },
        coverImage:{
            type:String,
            required:true
        },
        refreshtOKEN:{
            type:String,

        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ]


    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPassworCorrect= async function(password){
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateToken=function()
{
    return jwt.sign(
        {
            _id:_id,
            fullName:this.fullName,
            email:this.email,
            userName:this.userName
        },
        process.env.ACCESS_TOKEN_SCRET,
        {
           expiresIn:process.env.ACCESS_TOKEN_EXPAIRY
        }
    )
}

userSchema.methods.generateRefreshToken=function()
{
    return jwt.sign(
        {
            _id:_id,
        },
        process.env.ACCESS_REFRESH_TOKEN_SCRET,
        {
           expiresIn:process.env.ACCESS_REFRESH_TOKEN_EXPAIRY
        }

    )
}

export const User = mongoose.model("User", userSchema)