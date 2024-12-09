import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "../books/Book";

@Entity('authors')
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    bio: string;

    @Column({
            nullable: true,
        }
    )
    birth_date: Date;

    @Column({
            nullable: true,
        }
    )
    death_date: Date;

    @Column({
            nullable: true,
        }
    )
    image_url: string;

    @OneToMany(() => Book, book => book.author)
    books: Book[];
}