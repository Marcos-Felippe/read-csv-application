import { Request, Response } from "express";
import { ReadCSVService } from "../services/ReadCSVService";

import { Readable } from 'stream';
import readline from 'readline';

interface Product {
    name: string;
    quantity: number;
    price: number;
    codebar: string;
}

export class ReadCSVController {
    async handle(request: Request, response: Response) {

        const { file } = request;
        const { buffer } = file;

        //Criando um readable do buffer
        const readable = new Readable;
        readable.push(buffer);
        readable.push(null);

        //Pegando linha a linha do readable e colocando na constante
        const lines = readline.createInterface({
            input: readable,
        });

        const products: Product[] = [];

        //Colocando cada item da constante em um array
        for await (let line of lines) {
            const productLine = line.split(",");

            products.push({
                codebar: productLine[0],
                name: productLine[1],
                price: Number(productLine[2]),
                quantity: Number(productLine[3])
            });
        }

        const service = new ReadCSVService();

        const result = await service.execute( products );

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(200).json(result);
    }
}