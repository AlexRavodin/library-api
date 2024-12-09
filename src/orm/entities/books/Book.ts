import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Author} from "../authors/Author";
import {Genre} from "../genres/Genre";
import {BookLoan} from "./BookLoan";


@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    full_amount: number;

    @Column()
    description: string;

    @Column({
            nullable: true,
        }
    )
    image_url: string;

    @OneToMany(() => BookLoan, book_loan => book_loan.book)
    book_loans: BookLoan[];

    @ManyToOne(() => Author, author => author.books)
    author: Author;

    @ManyToMany(() => Genre, genre => genre.books)
    @JoinTable()
    genres: Genre[];
}
