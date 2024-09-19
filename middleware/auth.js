import User from "../models/users.model.js"
import { asyncVerify } from "../utils/jwt.js"


export const protect = async(req,res,next) => {
    try {
        const jwtToken = req.cookies.loginToken
        const tokenPayload = await asyncVerify(jwtToken,process.env.secret)
        const user = await User.findById(tokenPayload.userID)
        if (!user) {
            const err = new Error("The user who own this token, already deleted!");
            err.status = 401;
            throw err;
        }
        const tokenIssuedTime = tokenPayload.iat*1000
        const passChangedTime = new Date(user.updated_at).getTime()
        if (tokenIssuedTime<passChangedTime) {
            const err = new Error("The token is not valid anymore, because the password has been changed!");
            err.status = 401;
            throw err;
        }

        req.tokenPayload = tokenPayload
        next()
    } catch (error) {
        next(error)
    }
}
