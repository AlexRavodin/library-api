import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Genre} from "../../orm/entities/genres/Genre";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const genreRepository = getRepository(Genre);

    try {
        const genre = await genreRepository.findOne({where: {id}});

        if (!genre) {
            const customError = new CustomError(404, 'General', 'Not Found', [`Genre with id:${id} doesn't exists.`]);
            return next(customError);
        }
        await genreRepository.delete(id);

        res.customSuccess(200, 'Genre successfully deleted.', {id: genre.id, title: genre.name});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
