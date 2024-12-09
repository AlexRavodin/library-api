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
    booking_start_date: Date;

    @Column()
    booking_end_date: Date;

    @Column()
    loan_start_date: Date;

    @Column()
    loan_end_date: Date;

    isActive(currentDate: Date): boolean {
        return this.loan_start_date !== null
            && this.loan_end_date === null
            && this.loan_start_date <= currentDate
            && currentDate < this.booking_end_date;
    }

    isTaken(): boolean {
        return this.loan_end_date !== null;
    }

    isOverdue(currentDate: Date): boolean {
        return this.loan_end_date !== null && this.loan_end_date > currentDate;
    }
}