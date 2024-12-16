import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {BookLoan} from "../../orm/entities/books/BookLoan";

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    const bookRepository = getRepository(BookLoan);
    try {
        const loanId = parseInt(req.params.id);
        const loan = await bookRepository.findOne({where: {loanId}});

        if (!loan) {
            const customError = new CustomError(404, 'General', `Book loan with id:${loanId} not found.`, ['Book loan not found.']);
            return next(customError);
        }

        loan.returned = true;

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
