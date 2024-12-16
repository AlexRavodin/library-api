import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {CustomError} from 'utils/response/custom-error/CustomError';
import {Book} from "../../orm/entities/books/Book";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const bookRepository = getRepository(Book);

    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.pageSize as string) || 10;
        console.log("Page: " + page);
        console.log("Page size: " + limit);

        const title = req.query.title as string | undefined;
        const author = req.query.author as string | undefined;
        const genres = req.query.genres;

        console.log("After parse");

        const query = bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.author', 'author')
            .leftJoinAndSelect('book.genres', 'genres')
            .leftJoinAndSelect('book.book_loans', 'loans');

        console.log("After join");

        if (title) {
            console.log("Title: " + title);
            query.where('book.title ILIKE :title', {title: `%${title}%`});
        }
        if (author) {
            console.log("Author name: " + author);
            query.where('author.first_name ILIKE :author OR author.last_name ILIKE :author', {author: `%${author}%`});
        }
        if (genres) {
            if (Array.isArray(genres)) {
                const genreIds = genres.map(id => parseInt(id));
                query.where('genres.id IN (:...genres)', {genres: genreIds});
            } else {
                const genreId = parseInt(genres as string);
                query.where('genres.id = :genreId', {genreId});
            }
        }

        const startIndex = (page - 1) * limit;

        console.log("Index: " + startIndex);

        const [books, total] = await Promise.all([
            query.skip(startIndex).take(limit).getMany(),
            query.getCount(),
        ]);

        console.log(books);

        books.forEach(book => {
            const takenCount = book.book_loans.length;
            book.full_amount -= takenCount;
        });

        const response = {
            data: books,
            total: Math.ceil(total / limit),
        };

        res.customSuccess(200, 'List of books.', response);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of books.`, null, err);
        return next(customError);
    }
};
