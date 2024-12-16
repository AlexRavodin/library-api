import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Author} from "../../orm/entities/authors/Author";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const authorRepository = getRepository(Author);

    try {
        const books = await authorRepository
            .createQueryBuilder('author')
            .leftJoinAndSelect('author.books', 'books')
            .getMany();

        res.customSuccess(200, 'List of authors.', books);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of authors.`, null, err);
        return next(customError);
    }
};
