import {Router} from 'express'
import { getAllPosts, toPost } from '../controllers/posts.controller.js'
import { protect } from '../middleware/auth.js'
 
const postsRouter = Router()

postsRouter.route('/').get(getAllPosts)
postsRouter.route('/newpost').post(protect, toPost)

export default postsRouter