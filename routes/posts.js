import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', postsCtrl.index)

// router.get('/sort', postsCtrl.sort)

router.get('/new', isLoggedIn, postsCtrl.new)

router.get('/:postId', postsCtrl.show)

router.get('/:postId/edit', isLoggedIn, postsCtrl.edit)

router.get('/:postId/like', isLoggedIn, postsCtrl.addLike)

router.get('/:postId/dislike', isLoggedIn, postsCtrl.addDislike)

router.get('/:postId/comments/:commentId/edit', isLoggedIn, postsCtrl.editComment)

router.get('/:postId/comments/:commentId/like', isLoggedIn, postsCtrl.addLikeToComment)

router.get('/:postId/comments/:commentId/dislike', isLoggedIn, postsCtrl.addDislikeToComment)

router.post('/', isLoggedIn, postsCtrl.create)

router.post('/:postId/comments', isLoggedIn, postsCtrl.addComment)

router.delete('/:postId', isLoggedIn, postsCtrl.delete)

router.delete('/:postId/comments/:commentId', isLoggedIn, postsCtrl.deleteComment)

router.put('/:postId', isLoggedIn, postsCtrl.update)

router.put('/:postId/comments/:commentId', isLoggedIn, postsCtrl.updateComment)

export {
  router
}