import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import AppError from '../utils/AppError';
import httpStatus from 'http-status';
import { UserModel } from '../modules/user/user.model';



const auth = (...requiredRole: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        try {

            const token = req.headers.authorization;

            // checking if the token is missing
            if (!token) {
                throw new AppError(httpStatus.BAD_REQUEST, "Unauthorized Access",);
            }

            // checking if the given token is valid
            const decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            ) as JwtPayload;

            const { role, _id } = decoded;

            // check if the user exists
            const isUserExist = await UserModel.findById(_id).select("-password");

            if (!isUserExist) {
                throw new AppError(httpStatus.NOT_FOUND, "User not found ")
            }
          
            if (requiredRole && !requiredRole.includes(role)) {
                throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized!');
            }

            // setting user in request 
            req.user = decoded as JwtPayload;
           
            next();
        } catch (error) {

            const errorResponse = {
                success: false,
                message: 'Unauthorized Access',
                errorMessage: 'You do not have the necessary permissions to access this resource.',
                errorDetails: null,
                stack: null,
            };


            res.status(httpStatus.UNAUTHORIZED).json(errorResponse);
        }
    });
};

export default auth;

