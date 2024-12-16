import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Book} from "./Book";
import {User} from "../users/User";


@Entity('book_loans')
export class BookLoan {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book, book => book.book_loans)
    book: Book;

    @ManyToOne(() => User, user => user.book_loans)
    user: User;

    @Column()
    loan_start_date: Date;

    @Column()
    loan_end_date: Date;

    @Column()
    returned: boolean;
}