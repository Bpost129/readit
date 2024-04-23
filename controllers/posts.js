import { Post } from "../models/post.js"

function index(req, res) {
  Post.find({})
  .populate('author')
  .then(posts => {
    res.render('posts/index', {
      posts,
      title: 'Readit'
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
  req.body.createdAt = new Date().toLocaleTimeString()
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
  .populate('comments.author')
  .then(post => {
    res.render('posts/show', {
      post,
      title: post.title,
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

function addComment(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    req.body.author = req.user.profile._id
    req.body.createdAt = new Date().toLocaleTimeString()
    post.comments.push(req.body)
    post.save()
    .then(() => {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/posts')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function deleteComment(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    post.comments.remove({_id: req.params.commentId})
    post.save()
    .then(() => {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/posts')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function editComment(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    let comment = post.comments.find(comm => {
      return comm._id.equals(req.params.commentId)
    })
    comment.isEditing = !comment.isEditing
    post.save()
    .then(() => {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/posts')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function updateComment(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    let comment = post.comments.find(comm => {
      return comm._id.equals(req.params.commentId)
    })
    comment.text = req.body.text
    comment.isEditing = !comment.isEditing
    req.body.createdAt = new Date().toLocaleTimeString()
    post.save()
    .then(() => {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/posts')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function addLike(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    if (!post.likes.includes(req.user.profile._id)) {
      post.dislikes.remove(req.user.profile._id)
      post.likes.push(req.user.profile._id)
    } else {
      post.likes.remove(req.user.profile._id)
    }
    post.save()
    .then(() => {
      res.redirect(req.query.redirectTo)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/posts')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function addDislike(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    if (!post.dislikes.includes(req.user.profile._id)) {
      post.likes.remove(req.user.profile._id)
      post.dislikes.push(req.user.profile._id)
    } else {
      post.dislikes.remove(req.user.profile._id)
    }
    post.save()
    .then(() => {
      res.redirect(req.query.redirectTo)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/posts')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function addLikeToComment(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    let comment = post.comments.find(comm => {
      return comm._id.equals(req.params.commentId)
    })
    if (!comment.likes.includes(req.user.profile._id)) {
      comment.dislikes.remove(req.user.profile._id)
      comment.likes.push(req.user.profile._id)
    } else {
      comment.likes.remove(req.user.profile._id)
    }
    post.save()
    .then(() => {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/posts')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function addDislikeToComment(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    let comment = post.comments.find(comm => {
      return comm._id.equals(req.params.commentId)
    })
    if (!comment.dislikes.includes(req.user.profile._id)) {
      comment.likes.remove(req.user.profile._id)
      comment.dislikes.push(req.user.profile._id)
    } else {
      comment.dislikes.remove(req.user.profile._id)
    }
    post.save()
    .then(() => {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/posts')
    })
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
  addComment,
  deleteComment,
  editComment,
  updateComment,
  addLike,
  addDislike,
  addLikeToComment,
  addDislikeToComment,
  
}