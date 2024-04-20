import { Post } from "../models/post.js"

function index(req, res) {
  Post.find({})
  .populate('author')
  .then(posts => {
    res.render('posts/index', {
      posts,
      title: 'All Posts'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newPost(req, res) {
  res.render('posts/new', {
    title: 'Create Post'
  })
}

function create(req, res) {
  req.body.author = req.user.profile._id
  Post.create(req.body)
  .then(post => {
    res.redirect('/posts')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts/new')
  })
}

function show(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    res.render('posts/show', {
      post,
      title: 'Post Details'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts/new')
  })
}

export {
  index,
  newPost as new,
  create,
  show,

}