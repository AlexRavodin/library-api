import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Book} from "../../orm/entities/books/Book";
import {BookLoan} from "../../orm/entities/books/BookLoan";

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    const {loanId, loanStartDate, loanEndDate } = req.body;

    const bookRepository = getRepository(BookLoan);
    try {
        const loan = await bookRepository.findOne({where: {loanId}});

        if (!loan) {
            const customError = new CustomError(404, 'General', `Book loan with id:${loanId} not found.`, ['Book loan not found.']);
            return next(customError);
        }

        loan.loan_start_date = loanStartDate;
        loan.loan_end_date = loanEndDate;

        try {
            await bookRepository.save(loan);
            res.customSuccess(200, 'Book successfully saved.');
        } catch (err) {
            const customError = new CustomError(409, 'Raw', `Book loan with id '${loanId}' can't be saved.`, null, err);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
