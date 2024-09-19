import {Router} from 'express'
import { handleVerifyLink, login, register, updatePass, visitSomeone, yourProfile } from '../controllers/users.controller.js'
import { loginValidator, registerValidator, updatePassValidator} from '../validations/user.validation.js'
import { handleValidationResults } from '../middleware/handle.validation.js'
import { protect } from '../middleware/auth.js'
 
const usersRouter = Router()

usersRouter.route('/register').post(registerValidator,handleValidationResults, register)
usersRouter.route('/login').post(loginValidator,handleValidationResults, login)

usersRouter.route('/confirm/:token/:uid').get(handleVerifyLink)

usersRouter.route('/profile').get(protect, yourProfile)
usersRouter.route('/profile/:uid').get(visitSomeone)
usersRouter.route('/profile/update-pass').put(updatePassValidator,handleValidationResults,updatePass)

export default usersRouter