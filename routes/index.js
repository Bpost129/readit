import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  res.redirect('/posts')
  // res.render('index', { title: 'Readit' })
})

export {
  router
}
