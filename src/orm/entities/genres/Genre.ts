import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm';
import {Book} from "../books/Book";


@Entity('genres')
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => Book, book => book.genres)
    @JoinTable()
    books: Book[];
}