import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Author} from "../../orm/entities/authors/Author";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const authorRepository = getRepository(Author);

    try {
        const author = await authorRepository.findOne({where: {id}});

        if (!author) {
            const customError = new CustomError(404, 'General', 'Not Found', [`Author with id:${id} doesn't exists.`]);
            return next(customError);
        }
        await authorRepository.delete(id);

        res.customSuccess(200, 'Author successfully deleted.', {id: author.id, title: author.first_name});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
