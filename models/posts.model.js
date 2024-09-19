import {Schema, model} from 'mongoose'

const postSchema = new Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    creator:{ type:Schema.Types.ObjectId, ref: 'User',required:true },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
})

const Post = model('Post',postSchema)
export default Post