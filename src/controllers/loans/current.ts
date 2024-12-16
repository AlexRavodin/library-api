import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {BookLoan} from "../../orm/entities/books/BookLoan";

export const current = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.jwtPayload;

    const loanRepository = getRepository(BookLoan);

    try {
        const query = loanRepository
            .createQueryBuilder('loan')
            .leftJoinAndSelect('loan.user', 'user')
            .leftJoinAndSelect('loan.book', 'book')

        query.where('loan.user.id = :userId', {userId: id});

        const loans = await query.getMany();

        res.customSuccess(200, 'List of books.', loans);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of books.`, null, err);
        return next(customError);
    }
};
