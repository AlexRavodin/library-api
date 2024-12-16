import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Book} from "../../orm/entities/books/Book";

export const show = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const bookRepository = getRepository(Book);

    try {
        const book = await bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.author', 'author')
            .leftJoinAndSelect('book.genres', 'genres')
            .where('book.id = :id', {id})
            .getOne();

        if (!book) {
            const customError = new CustomError(404, 'General', `Book with id:${id} not found.`, ['Book not found.']);
            return next(customError);
        }
        res.customSuccess(200, 'Book found', book);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
