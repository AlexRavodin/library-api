import {NextFunction, Request, Response} from 'express';
import validator from 'validator';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {ErrorValidation} from 'utils/response/custom-error/types';

export const validatorCreateLoan =
    (req: Request, res: Response,
     next: NextFunction) => {
    let {bookId, startDate, endDate } = req.body;
    const errorsValidation: ErrorValidation[] = [];

    console.log("Validating create loan...");
    console.log("Book id: " + bookId);
    console.log("startDate: " + startDate);
    console.log("endDate: " + endDate);

    if (validator.isEmpty(bookId)) {
        errorsValidation.push({bookId:
                'Book ID is required'});
    }
    if (!validator.isNumeric(bookId ?? "")) {
        errorsValidation.push({bookId:
                'Book ID must be a number'});
    }


    if (!validator.isDate(startDate ?? "")) {
        errorsValidation.push({bookStartDate:
                'Book start date must be a valid date'});
    }
    if (validator.isEmpty(startDate)) {
        errorsValidation.push({bookStartDate:
                'Book start date is required'});
    }

    if (!validator.isDate(endDate ?? "")) {
        errorsValidation.push({bookEndDate:
                'Book end date must be a valid date'});
    }
    if (validator.isEmpty(endDate)) {
        errorsValidation.push({bookEndDate:
                'Book end date is required'});
    }

    if (errorsValidation.length !== 0) {
        const customError =
            new CustomError(
            400,
            'Validation',
            'Create loan validation error',
            null,
            null,
            errorsValidation,
        );
        return next(customError);
    }
    return next();
};
