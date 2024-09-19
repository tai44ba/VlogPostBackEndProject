import { promisify } from 'util';
import jwt from 'jsonwebtoken'

export const asyncSign = async(payload,secret) => {
    const ASign = promisify(jwt.sign)
    return await ASign(payload,secret)
}

export const asyncVerify = async (jwtToken, secret) => {
    const AVerify = promisify(jwt.verify);
    return await AVerify(jwtToken, secret)
}