import { getRepository } from 'typeorm';
import { Products } from '../entities/Products';

interface Product {
    name: string;
    quantity: number;
    price: number;
    codebar: string;
}

export class ReadCSVService {
    async execute( products: Product[] ): Promise<Product[] | Error> {

        const repo = getRepository(Products);

        try {
            for await ( let {codebar, name, price, quantity} of products ) {

                const product = repo.create({
                    codebar,
                    name,
                    price,
                    quantity
                });

                await repo.save(product);
            }
            
            return products;
        } catch (error) {
            return new Error(error);
        }
    }
}