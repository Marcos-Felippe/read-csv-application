import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity("productsfromcsv")
export class Products {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    codebar: string;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}