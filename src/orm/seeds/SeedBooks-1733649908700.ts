import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { Book } from '../entities/books/Book';
import { Author } from '../entities/authors/Author';
import { Genre } from '../entities/genres/Genre';

export class SeedBooks1733649908700 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const genreRepository = getRepository(Genre);
        const authorRepository = getRepository(Author);
        const bookRepository = getRepository(Book);

        // Insert genres
        let genre = new Genre();
        genre.name = 'Fantasy';
        genre.description = 'A genre of fiction that involves magical or supernatural elements.';
        await genreRepository.save(genre);

        genre = new Genre();
        genre.name = 'Science Fiction';
        genre.description = 'A genre of fiction that deals with imaginative and futuristic concepts.';
        await genreRepository.save(genre);

        genre = new Genre();
        genre.name = 'Historical Fiction';
        genre.description = 'Fiction books that are inspired by real events in history but are not factual retellings.';
        await genreRepository.save(genre);

        genre = new Genre();
        genre.name = 'Romance';
        genre.description = 'Books that center around would-be lovers and the obstacles they face in getting together.';
        await genreRepository.save(genre);

        genre = new Genre();
        genre.name = 'Thriller';
        genre.description = 'A genre of fiction intended to thrill and entertain the reader, often involving suspense and action.';
        await genreRepository.save(genre);

        genre = new Genre();
        genre.name = 'Mystery';
        genre.description = 'Plots that revolve around a crime or mystery that must be solved or foiled by the protagonist.';
        await genreRepository.save(genre);

        genre = new Genre();
        genre.name = 'Action & Adventure';
        genre.description = 'Novels featuring a main character on a quest to achieve an ultimate goal, encountering high-stakes situations.';
        await genreRepository.save(genre);

        // Insert authors
        let author = new Author();
        author.first_name = 'John Ronald Reuel';
        author.last_name = 'Tolkien';
        author.bio = 'J.R.R. Tolkien was an English author, philologist, and university professor best known for his fantasy stories.';
        author.birth_date = new Date('1892-01-03');
        author.death_date = new Date('1973-09-02');
        author.image_url = 'https://example.com/tolkien.jpg';
        await authorRepository.save(author);

        author = new Author();
        author.first_name = 'George Raymond Richard';
        author.last_name = 'Martin';
        author.bio = 'George R.R. Martin is an American novelist and short-story writer in the fantasy, horror, and science fiction genres.';
        author.birth_date = new Date('1948-09-20');
        author.image_url = 'https://example.com/martin.jpg';
        await authorRepository.save(author);

        author = new Author();
        author.first_name = 'Joanne Kathleen';
        author.last_name = 'Rowling';
        author.bio = 'J.K. Rowling is a British author, screenwriter, and philanthropist best known for writing the Harry Potter fantasy series.';
        author.birth_date = new Date('1965-07-31');
        author.image_url = 'https://example.com/rowling.jpg';
        await authorRepository.save(author);

        author = new Author();
        author.first_name = 'Stephen Edwin';
        author.last_name = 'King';
        author.bio = 'Stephen King is an American author of horror, supernatural fiction, suspense, and fantasy novels.';
        author.birth_date = new Date('1947-09-21');
        author.image_url = 'https://example.com/king.jpg';
        await authorRepository.save(author);

        author = new Author();
        author.first_name = 'Jane';
        author.last_name = 'Austen';
        author.bio = 'Jane Austen was an English novelist known primarily for her six major novels.';
        author.birth_date = new Date('1775-12-16');
        author.death_date = new Date('1817-07-18');
        author.image_url = 'https://example.com/austen.jpg';
        await authorRepository.save(author);

        author = new Author();
        author.first_name = 'Charles John Huffam';
        author.last_name = 'Dickens';
        author.bio = 'Charles Dickens was an English novelist, journalist, and social commentator.';
        author.birth_date = new Date('1812-02-07');
        author.death_date = new Date('1870-06-09');
        author.image_url = 'https://example.com/dickens.jpg';
        await authorRepository.save(author);

        author = new Author();
        author.first_name = 'Orson Scott';
        author.last_name = 'Card';
        author.bio = 'Orson Scott Card is an American author known for his science fiction and fantasy works.';
        author.birth_date = new Date('1951-08-24');
        author.image_url = 'https://example.com/card.jpg';
        await authorRepository.save(author);

        author = new Author();
        author.first_name = 'Frank';
        author.last_name = 'Herbert';
        author.bio = 'Frank Herbert was an American author best known for his science fiction novel Dune.';
        author.birth_date = new Date('1920-10-08');
        author.death_date = new Date('1986-02-11');
        author.image_url = 'https://example.com/herbert.jpg';
        await authorRepository.save(author);

        author = new Author();
        author.first_name = 'Agatha';
        author.last_name = 'Christie';
        author.bio = 'Agatha Christie was a British author known for her mystery novels.';
        author.birth_date = new Date('1890-09-15');
        author.death_date = new Date('1976-01-12');
        author.image_url = 'https://example.com/christie.jpg';
        await authorRepository.save(author);

        author = new Author();
        author.first_name = 'Yann';
        author.last_name = 'Martel';
        author.bio = 'Yann Martel is a Canadian author known for his novel Life of Pi.';
        author.birth_date = new Date('1963-06-25');
        author.image_url = 'https://example.com/martel.jpg';
        await authorRepository.save(author);

        // Insert books with relationships to authors and genres
        let book = new Book();
        book.title = 'The Lord of the Rings';
        book.full_amount = 1000;
        book.description = 'A high fantasy novel by J.R.R. Tolkien.';
        book.image_url = 'https://example.com/lord-of-the-rings.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Tolkien' } });
        book.genres = await genreRepository.find({ where: { name: 'Fantasy' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'A Game of Thrones';
        book.full_amount = 500;
        book.description = 'The first book in the A Song of Ice and Fire series by George R.R. Martin.';
        book.image_url = 'https://example.com/game-of-thrones.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Martin' } });
        book.genres = await genreRepository.find({ where: { name: 'Fantasy' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'Harry Potter and the Philosopher\'s Stone';
        book.full_amount = 1000;
        book.description = 'The first book in the Harry Potter series by J.K. Rowling.';
        book.image_url = 'https://example.com/harry-potter.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Rowling' } });
        book.genres = await genreRepository.find({ where: { name: 'Fantasy' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'The Shining';
        book.full_amount = 500;
        book.description = 'A horror novel by Stephen King.';
        book.image_url = 'https://example.com/the-shining.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'King' } });
        book.genres = await genreRepository.find({ where: { name: 'Thriller' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'Pride and Prejudice';
        book.full_amount = 500;
        book.description = 'A romance novel by Jane Austen.';
        book.image_url = 'https://example.com/pride-and-prejudice.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Austen' } });
        book.genres = await genreRepository.find({ where: { name: 'Romance' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'Oliver Twist';
        book.full_amount = 500;
        book.description = 'A historical fiction novel by Charles Dickens.';
        book.image_url = 'https://example.com/oliver-twist.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Dickens' } });
        book.genres = await genreRepository.find({ where: { name: 'Historical Fiction' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'Ender\'s Game';
        book.full_amount = 500;
        book.description = 'A science fiction novel by Orson Scott Card.';
        book.image_url = 'https://example.com/enders-game.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Card' } });
        book.genres = await genreRepository.find({ where: { name: 'Science Fiction' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'Dune';
        book.full_amount = 1000;
        book.description = 'A science fiction novel by Frank Herbert.';
        book.image_url = 'https://example.com/dune.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Herbert' } });
        book.genres = await genreRepository.find({ where: { name: 'Science Fiction' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'Murder on the Orient Express';
        book.full_amount = 500;
        book.description = 'A mystery novel by Agatha Christie.';
        book.image_url = 'https://example.com/murder-on-the-orient-express.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Christie' } });
        book.genres = await genreRepository.find({ where: { name: 'Mystery' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'Life of Pi';
        book.full_amount = 500;
        book.description = 'An adventure novel by Yann Martel.';
        book.image_url = 'https://example.com/life-of-pi.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Martel' } });
        book.genres = await genreRepository.find({ where: { name: 'Action & Adventure' } });
        await bookRepository.save(book);

        // Additional books
        book = new Book();
        book.title = 'The Hobbit';
        book.full_amount = 500;
        book.description = 'A fantasy novel by J.R.R. Tolkien.';
        book.image_url = 'https://example.com/the-hobbit.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Tolkien' } });
        book.genres = await genreRepository.find({ where: { name: 'Fantasy' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'A Clash of Kings';
        book.full_amount = 500;
        book.description = 'The second book in the A Song of Ice and Fire series by George R.R. Martin.';
        book.image_url = 'https://example.com/a-clash-of-kings.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Martin' } });
        book.genres = await genreRepository.find({ where: { name: 'Fantasy' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'The Two Towers';
        book.full_amount = 500;
        book.description = 'The second book in The Lord of the Rings series by J.R.R. Tolkien.';
        book.image_url = 'https://example.com/the-two-towers.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Tolkien' } });
        book.genres = await genreRepository.find({ where: { name: 'Fantasy' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'The Return of the King';
        book.full_amount = 500;
        book.description = 'The third book in The Lord of the Rings series by J.R.R. Tolkien.';
        book.image_url = 'https://example.com/the-return-of-the-king.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Tolkien' } });
        book.genres = await genreRepository.find({ where: { name: 'Fantasy' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'Harry Potter and the Chamber of Secrets';
        book.full_amount = 500;
        book.description = 'The second book in the Harry Potter series by J.K. Rowling.';
        book.image_url = 'https://example.com/harry-potter-and-the-chamber-of-secrets.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Rowling' } });
        book.genres = await genreRepository.find({ where: { name: 'Fantasy' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'The Stand';
        book.full_amount = 1000;
        book.description = 'A post-apocalyptic horror novel by Stephen King.';
        book.image_url = 'https://example.com/the-stand.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'King' } });
        book.genres = await genreRepository.find({ where: { name: 'Thriller' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'Sense and Sensibility';
        book.full_amount = 500;
        book.description = 'A romance novel by Jane Austen.';
        book.image_url = 'https://example.com/sense-and-sensibility.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Austen' } });
        book.genres = await genreRepository.find({ where: { name: 'Romance' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'David Copperfield';
        book.full_amount = 500;
        book.description = 'A historical fiction novel by Charles Dickens.';
        book.image_url = 'https://example.com/david-copperfield.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Dickens' } });
        book.genres = await genreRepository.find({ where: { name: 'Historical Fiction' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'Speaker for the Dead';
        book.full_amount = 500;
        book.description = 'A science fiction novel by Orson Scott Card.';
        book.image_url = 'https://example.com/speaker-for-the-dead.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Card' } });
        book.genres = await genreRepository.find({ where: { name: 'Science Fiction' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'God Emperor of Dune';
        book.full_amount = 500;
        book.description = 'A science fiction novel by Frank Herbert.';
        book.image_url = 'https://example.com/god-emperor-of-dune.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Herbert' } });
        book.genres = await genreRepository.find({ where: { name: 'Science Fiction' } });
        await bookRepository.save(book);

        book = new Book();
        book.title = 'And Then There Were None';
        book.full_amount = 500;
        book.description = 'A mystery novel by Agatha Christie.';
        book.image_url = 'https://example.com/and-then-there-were-none.jpg';
        book.author = await authorRepository.findOne({ where: { last_name: 'Christie' } });
        book.genres = await genreRepository.find({ where: { name: 'Mystery' } });
        await bookRepository.save(book);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // Implement the down method to revert the changes if needed
        console.log('Not implemented');
    }
}
