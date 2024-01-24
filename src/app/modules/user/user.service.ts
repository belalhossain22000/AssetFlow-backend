
import config from "../../config";
import { TLoginUser, TUser, UserDocument } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { newPasswordValidationSchema } from "./user.validation";
import AppError from "../../utils/AppError";
import httpStatus from "http-status";




// create user /register user
const createUserIntoDB = async (payload: TUser) => {

    const isUserExist = await UserModel.findOne({ email: payload?.email })

    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User already exist")
    }

    const result = await UserModel.create(payload) as UserDocument

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "something went wrong user not crated")
    }

    const returnUser = {
        _id: result?._id,
        username: result?.username,
        email: result?.email,
        role: result?.role,
        createdAt: result?.createdAt,
        updatedAt: result?.updatedAt,
    }
    return returnUser

}


// handle login 
const loginUser = async (payload: TLoginUser) => {

    const { username, password } = payload;

    // Find the user by email in the database
    const user = await UserModel.findOne({ username });


    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, ` User not found `)
    }
    // Compare the provided password 
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid password")
    }

    const jwtPayload = {
        _id: user._id,
        email: user?.email,
        role: user?.role
    }

    const returnUser = {
        _id: user?._id,
        username: user?.username,
        email: user?.email,
        role: user?.role
    }

    // generate access token
    const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: "30d" })

    return {
        user: returnUser,
        token
    }

};

// change password
const changePasswordIntoDB = async (userData: JwtPayload, payload: { currentPassword: string, newPassword: string }) => {

    // // Find the user by email in the database
    const user = await UserModel.findOne({ _id: userData?._id });

    // // check the user is exist
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, ` User not found `)
    }
    //  Compare the provided password 
    const passwordMatch = await bcrypt.compare(payload.currentPassword, user.password);

    if (!passwordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid password")
    }

    //  current one password checking is match
    if (payload.currentPassword === payload.newPassword) {
        throw new Error( "Password change failed. Ensure the new password is unique and not among the last 2 used and current one")
    }

    newPasswordValidationSchema.parse({ newPassword: payload.newPassword });
   
    //  hashing new password
    const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.password_salt_rounds))


    const result = await UserModel.findOneAndUpdate(
        { _id: user?._id, email: user?.email, role: user?.role },
        { password: newHashedPassword, },
        { new: true }
    ).select("-password")

    return result
}

export const UserService = {
    createUserIntoDB,
    loginUser,
    changePasswordIntoDB
}