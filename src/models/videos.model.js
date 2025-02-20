import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema
(
    {
        videoFile:{
            type:String,
            required:true
        },
        thumbNail:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
        },
        duration:{
            type:Number
        },
        views:{
            type:Number
        },
        isPublished:{
            type:Boolean
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User" 
        }
    },
    {
        timestamps:true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.Schema("Video", videoSchema)