import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Book} from "../../orm/entities/books/Book";
import {BookLoan} from "../../orm/entities/books/BookLoan";
import {User} from "../../orm/entities/users/User";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.jwtPayload;
    const {bookId, startDate, endDate} = req.body;

    const loanRepository = getRepository(BookLoan);
    const userRepository = getRepository(User);
    const bookRepository = getRepository(Book);
    try {
        const user = await userRepository.findOne({where: {id}});

        if (!user) {
            const customError = new CustomError(404, 'General', `User  with id: ${bookId} not found.`, ['Book loan not found.']);
            return next(customError);
        }

        const book = await bookRepository.findOne({ where: { id: bookId}});

        if (!book) {
            const customError = new CustomError(404, 'General', `Book  with id: ${bookId} not found.`, ['Book loan not found.']);
            return next(customError);
        }

        const loan = new BookLoan();
        loan.loan_start_date = startDate as Date;
        loan.loan_end_date = endDate as Date;
        loan.user = user;
        loan.book = book;
        loan.returned = false;

        try {
            await loanRepository.save(loan);
            res.customSuccess(200, 'Book successfully saved.');
        } catch (err) {
            const customError = new CustomError(409, 'Raw', `Book loan for book with id '${bookId}' can't be created.`, null, err);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
