import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JwtPayload } from '../types/JwtPayload';
import { createJwtToken } from '../utils/createJwtToken';
import { CustomError } from '../utils/response/custom-error/CustomError';
import {CookieKey} from "../consts/TokenSettings";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  console.log("Checking jwt.");
  const token: string | null = req.cookies[CookieKey];
  if (!token) {
    console.log("No token found.");
    const customError = new CustomError(401, 'Raw', 'Token not provided');
    return next(customError);
  }

  let jwtPayload: { [key: string]: any };
  try {
    console.log(`Validating token: ${token}`);
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as { [key: string]: any };
    ['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
    req.jwtPayload = jwtPayload as JwtPayload;
  } catch (err) {
    console.log("Token is invalid.");
    const customError = new CustomError(401, 'Raw', 'JWT error', null, err);
    return next(customError);
  }

  try {
    /*const newToken = createJwtToken(jwtPayload as JwtPayload);
    console.log(`New token created: ${newToken}`);
    res.cookie('token', newToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });*/
    return next();
  } catch (err) {
    console.log('Error creating token.');
    const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
    return next(customError);
  }
};
