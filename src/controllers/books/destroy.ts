import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Book} from "../../orm/entities/books/Book";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const bookRepository = getRepository(Book);

    try {
        const book = await bookRepository.findOne({where: {id}});

        if (!book) {
            const customError = new CustomError(404, 'General', 'Not Found', [`Book with id:${id} doesn't exists.`]);
            return next(customError);
        }
        await bookRepository.delete(id);

        res.customSuccess(200, 'Book successfully deleted.', {id: book.id, title: book.title});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
