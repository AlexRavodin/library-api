import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {BookLoan} from "../../orm/entities/books/BookLoan";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const loanRepository = getRepository(BookLoan);

    try {
        const loanId = parseInt(req.params.id);

        console.log("Loan id to delete: " + loanId);

        const loan = await loanRepository.findOne({where: { id: loanId}});

        if (!loan) {
            const customError = new CustomError(404, 'General', `Book loan with id: ${loanId} not found.`, ['Book loan not found.']);
            return next(customError);
        }

        try {
            await loanRepository.delete(loanId);
            res.customSuccess(200, 'Book successfully deleted.');
        } catch (err) {
            const customError = new CustomError(409, 'Raw', `Book loam with id: '${loanId}' can't be deleted.`, null, err);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
