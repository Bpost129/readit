import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', postsCtrl.index)

router.get('/new', isLoggedIn, postsCtrl.new)

router.get('/:postId', postsCtrl.show)

router.get('/:postId/edit', isLoggedIn, postsCtrl.edit)

router.post('/', isLoggedIn, postsCtrl.create)

router.delete('/:postId', isLoggedIn, postsCtrl.delete)

router.put('/:postId', isLoggedIn, postsCtrl.update)

export {
  router
}