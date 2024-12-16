import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Author} from "../../orm/entities/authors/Author";

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const {firstName: newFirstName, secondName: newLastName} = req.body;

    const authorRepository = getRepository(Author);

    try {
        const author = await authorRepository.findOne({where: {id}});

        if (!author) {
            const customError = new CustomError(404, 'General', `Author with id:${id} not found.`, ['Author not found.']);
            return next(customError);
        }

        author.first_name = newFirstName;
        author.last_name = newLastName;

        try {
            await authorRepository.save(author);
            res.customSuccess(200, 'Author successfully saved.');
        } catch (err) {
            const customError = new CustomError(409, 'Raw', `Author '${author.last_name}' can't be saved.`, null, err);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
