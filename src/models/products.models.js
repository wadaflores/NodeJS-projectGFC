import fs from 'fs';
import path from 'path';
import { app } from '../data/firebase.data.js';

//const __dirname = import.meta.dirname; ES IGUAL A process.cwd():
const productsFilePath = path.join(process.cwd(),'src', 'data', 'products.data.json');

console.log("path", productsFilePath)

export async function readProductsFile() {
    try {
        const data = await fs.readFile(productsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading products file:', error);
        return [];
    }
}

export async function getAllProducts() {
    return await readProductsFile();
}

export async function getProductById(id) {
    const products = await readProductsFile();
    return products.find(product => product.id == id);
}