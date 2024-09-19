import User, { Verify } from "../models/users.model.js";
import { v4 as uuidv4 } from "uuid";
import { emailSender } from "../utils/mailer.js";
import jwt from "jsonwebtoken";
import { asyncSign } from "../utils/jwt.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      const newUser = await User.create({ name, email, password });
      //1. before sending email create a random token
      const token = uuidv4();
      //2. the token together with userId should be saved in database with VerifySchema
      const verify = await Verify.create({ token, userId: newUser._id });
      //3. generate a verification request link like:http: //localhost:5000/users/verify/:token/:uid
      //4. setup nodemailer transporter
      //5. send mail by setup the from, to, subject, body of your email
      emailSender(newUser, verify);
      res.json({ msg: "Registered Successfully!!", user: newUser });
    } else {
      const err = new Error("This User already exist!");
      err.status = 400;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

export const handleVerifyLink = async (req, res, next) => {
  try {
    const token = req.params.token;
    const uid = req.params.uid;
    // looking for a userId and token in database
    const tokenRecord = await Verify.findOne({ token, userId: uid });
    // if there is no userId with that give token
    if (!tokenRecord) {
      const err = new Error("verification link is not valid!");
      err.status = 404;
      throw err;
    }
    const user = await User.findByIdAndUpdate(uid, { isActive: true });
    res.send("Thank you for verification");
  } catch (error) {
    next(error);
  }
};

// 1. validate credentials (email, password)
// 2. destructure them from req.body
// 3. find user by email
// 4. if there is no user with that email, create error
// 5. if there is user then compare password with the help of an schema method
// 14:46
// 6. if the password is match with hash value then generate a jwt token
// 7. put the token into a cookie
// 8. attach the cookie to response and send it to frontend
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("there is no such user !");
      err.status = 403;
      throw err;
    }
    if (!user.isActive) {
      const err = new Error("Please verify your email");
      err.status = 403;
      throw err;
    }

    if (await user.comparePass(password)) {
      user.password = undefined;
      user.__v = undefined;
      user.isActive = undefined;
      user.created_at = undefined;
      user.updated_at = undefined;

      const jwtToken = await asyncSign(
        { userID: user._id, name: user.name },
        process.env.secret
      );
      res
        .cookie("loginToken", jwtToken, {
          httpOnly: true,
          expiresIn: new Date(Date.now()) + 3600000 * 24,
        })
        .json({ msg: "Logged in !!", user });
    } else {
      res.status(400).json({ msg: "email/password is not correct!" });
    }
  } catch (error) {
    next(error);
  }
};

export const updatePass = async (req, res, next) => {
  try {
    const { email, password, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("there is no such user !");
      err.status = 403;
      throw err;
    }
    if (await user.comparePass(password)) {
      user.password = newPassword;
      user.save();
      res.clearCookie('loginToken').json({ msg: "the user's password updated !!" });
    }
  } catch (error) {
    next(error);
  }
};

export const yourProfile = async (req, res, next) => {
  try {
    const { userID } = req.tokenPayload;
    const user = await User.findById(userID).populate("posts").exec();
    if (!user) {
      const err = new Error("there is no such user !");
      err.status = 403;
      throw err;
    }
    res.json({ msg: "Got your profile !!", user });
  } catch (error) {
    next(error);
  }
};

export const visitSomeone = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const user = await User.findById(uid).populate("posts").exec();
    if (!user) {
      const err = new Error("there is no such user !");
      err.status = 403;
      throw err;
    }
    user.password = undefined;
    user.email = undefined;
    user.__v = undefined;
    user.isActive = undefined;
    user.created_at = undefined;
    user.updated_at = undefined;
    res.json({ msg: "you are visiting someone's profile!!", user });
  } catch (error) {
    next(error);
  }
};
