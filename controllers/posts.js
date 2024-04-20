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
  .populate('author')
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

function edit(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    res.render('posts/edit', {
      post,
      title: 'Edit Post'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function update(req, res) {
  Post.findByIdAndUpdate(req.params.postId, req.body, {new: true})
  .then(post => {
    res.redirect(`/posts/${post._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function deletePost(req, res) {
  Post.findByIdAndDelete(req.params.postId)
  .then(post => {
    res.redirect('/posts')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

export {
  index,
  newPost as new,
  create,
  show,
  edit,
  update,
  deletePost as delete,

}