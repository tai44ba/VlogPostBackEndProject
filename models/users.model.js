import {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,min:5},
    posts:[{ type: Schema.Types.ObjectId, ref: 'Post' }],
    isActive:{type:Boolean, default:false},
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
})

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            next()
        } else {
            this.password = await bcrypt.hash(this.password,11)
            this.updated_at = Date.now()
        }
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePass = async function (plainTextPass) {
    return await bcrypt.compare(plainTextPass, this.password);
};

const verifySchema = new Schema({
    token:{type:String,required:true},
    userId:{type:Schema.Types.ObjectId,required:true}
})

export const Verify = model('Verify',verifySchema)
const User = model('User',userSchema)
export default User