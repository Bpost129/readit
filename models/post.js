import mongoose from "mongoose"

const Schema = mongoose.Schema

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleTimeString(),
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
    type: Array,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleTimeString(),
  },
  comments: [commentSchema],
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}