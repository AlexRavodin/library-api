import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Book} from "../../orm/entities/books/Book";

const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const listRandom = async (req: Request, res: Response, next: NextFunction) => {
    const bookRepository = getRepository(Book);
    try {
        const count = parseInt(req.query.count as string) || 1;

        const query = bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.author', 'author')
            .leftJoinAndSelect('book.genres', 'genres');

        const maxCount = await query.getCount();
        const maxSkip = maxCount - 1 - count;
        const skipCount = getRandomInt(0, maxSkip);
        const books = await query.skip(skipCount).take(count).getMany();

        console.log("Random books:");
        console.log(books);

        res.customSuccess(200, 'List of books.', books);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of books.`, null, err);
        return next(customError);
    }
};
