import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Genre} from "../../orm/entities/genres/Genre";

export const show = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const genreRepository = getRepository(Genre);
    
    try {
        const book = await genreRepository.findOne(id, {
            select: ['id', 'name', 'description'],
        });

        if (!book) {
            const customError = new CustomError(404, 'General', `Genre with id:${id} not found.`, ['Genre not found.']);
            return next(customError);
        }
        res.customSuccess(200, 'Genre found', book);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
