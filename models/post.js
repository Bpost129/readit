import mongoose from "mongoose"

const Schema = mongoose.Schema

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
})

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema],
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}