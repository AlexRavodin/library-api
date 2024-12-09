import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Book} from "../../orm/entities/books/Book";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const bookRepository = getRepository(Book);
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const title = req.query.title as string | undefined;
        const author = req.query.author as string | undefined;
        const genres = req.query.genres as string | undefined;

        const bookRepository = getRepository(Book);

        const query = bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.author', 'author')
            .leftJoinAndSelect('book.genres', 'genres');

        if (title) {
            query.where('book.title ILIKE :title', {title: `%${title}%`});
        }
        if (author) {
            query.where('author.first_name ILIKE :author OR author.last_name ILIKE :author', {author: `%${author}%`});
        }
        if (genres) {
            const genreIds = genres.split(',').map(id => parseInt(id));
            query.where('genres.id IN (:...genres)', {genres: genreIds});
        }

        const startIndex = (page - 1) * limit;

        const [books, total] = await Promise.all([
            query.skip(startIndex).take(limit).getMany(),
            query.getCount(),
        ]);

        /*// Convert date strings to Date objects if necessary
        books.forEach(book => {
          if (book.author.birth_date && typeof book.author.birth_date === 'string') {
            book.author.birth_date = new Date(book.author.birth_date);
          }
          if (book.author.death_date && typeof book.author.death_date === 'string') {
            book.author.death_date = new Date(book.author.death_date);
          }
        });*/

        const response = {
            message: 'Books found',
            responseCode: 200,
            data: books,
            metadata: {
                total: total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            },
        };

        res.customSuccess(200, 'List of books.', books);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of books.`, null, err);
        return next(customError);
    }
};
