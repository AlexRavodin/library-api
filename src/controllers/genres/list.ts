import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Genre} from "../../orm/entities/genres/Genre";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const genreRepository = getRepository(Genre);
    try {
        const genres = await genreRepository.find({
            select: ['id', 'name', 'description'],
        });

        res.customSuccess(200, 'List of genres.', genres);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of genres.`, null, err);
        return next(customError);
    }
};
