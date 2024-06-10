import mongoose, { Schema } from "mongoose";

// Import mongoose aggregator
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


//Schema for Video
const videoSchema = new Schema ({
    videoFile: {
        type: String, // cloudinary url store
        required: true
    },
    thumbnail: {
        type: String, // cloudinary url store
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },

}, {timestamps: true})



videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)