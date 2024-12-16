import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {BookLoan} from "../../orm/entities/books/BookLoan";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const loanRepository = getRepository(BookLoan);

    try {
        const query = loanRepository
            .createQueryBuilder('loan')
            .leftJoinAndSelect('loan.user', 'user')
            .leftJoinAndSelect('loan.book', 'book');

        const loans = await query.getMany();

        res.customSuccess(200, 'List of books.', loans);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of books.`, null, err);
        return next(customError);
    }
};
