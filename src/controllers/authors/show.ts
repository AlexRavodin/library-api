import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Author} from "../../orm/entities/authors/Author";

export const show = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const authorRepository = getRepository(Author);
    try {
        const author = await authorRepository
            .createQueryBuilder('author')
            .leftJoinAndSelect('author.books', 'books')
            .where('author.id = :id', {id})
            .getOne();

        if (!author) {
            const customError = new CustomError(404, 'General', `Author with id:${id} not found.`, ['Author not found.']);
            return next(customError);
        }
        res.customSuccess(200, 'Author found', author);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
