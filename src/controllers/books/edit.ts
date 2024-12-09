import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Book} from "../../orm/entities/books/Book";

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const {title: newTitle, description: newDescription} = req.body;

    const bookRepository = getRepository(Book);
    try {
        const book = await bookRepository.findOne({where: {id}});

        if (!book) {
            const customError = new CustomError(404, 'General', `Book with id:${id} not found.`, ['Book not found.']);
            return next(customError);
        }

        book.title = newTitle;
        book.description = newDescription;

        try {
            await bookRepository.save(book);
            res.customSuccess(200, 'Book successfully saved.');
        } catch (err) {
            const customError = new CustomError(409, 'Raw', `Book '${book.title}' can't be saved.`, null, err);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
