import {CustomError} from "../../utils/response/custom-error/CustomError";
import {NextFunction, Request, Response} from "express";
import {CookieKey} from "../../consts/TokenSettings";

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie(CookieKey);
        res.status(200).json({message: 'Logged out successfully'});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', "Logout failed", null, err);
        return next(customError);
    }
};