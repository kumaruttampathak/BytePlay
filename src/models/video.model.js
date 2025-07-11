import mongoose,  {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    videoFile : {
        type: String, // cloudinary url
        required : ture
    },
    thumbnail: {
        type: String, // cloudinary url
        required: true
    },
    title :{
        type: String, 
        required: true
    },
    description: {
        title: String,
        required: true
    },
    duration:{
        type : Number, // extract from cloudinary
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished : {
        type: Boolean,
        default : true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: ture})

videoSchema.plugin(mongooseAggregatePaginate) // provides the power to use aggregation query in mongoose

export const Video = mongoose.model("Video", videoSchema)