import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Book} from "../../orm/entities/books/Book";
import {Genre} from "../../orm/entities/genres/Genre";
import {Author} from "../../orm/entities/authors/Author";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const {title, description, imageUrl, fullAmount, authorId, genreIds} = req.body;

    const bookRepository = getRepository(Book);
    const authorRepository = getRepository(Author);
    const genreRepository = getRepository(Genre);
    try {
        const genres = await genreRepository.findByIds(genreIds);

        if (!genres || genres.length === genres.length) {
            const customError = new CustomError(404, 'General', `New book with name: ${title} can not be created due to genres.`,
                ['Book not found.']);
            return next(customError);
        }

        const author = await authorRepository.findOne(authorId);

        if (!author) {
            const customError = new CustomError(404, 'General', `New book with name: ${title} can not be created due to author.`,
                ['Book not found.']);
            return next(customError);
        }

        const book = new Book();

        book.title = title;
        book.description = description;
        book.image_url = imageUrl;
        book.full_amount = fullAmount;
        book.author = author;
        book.genres = genres;

        try {
            await bookRepository.save(book);
            res.customSuccess(200, 'Book successfully created.');
        } catch (err) {
            const customError = new CustomError(409, 'Raw', `Book '${book.title}' can't be created.`, null, err);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
