import { getAllProducts, getProductById } from "../models/products.models.js"
import { readDocuments, readDocument, createDocument, setDocument, updateDocument, deleteDocument, queryDocumentsByStatus } from "../data/firestore.models.js";

/*const products = [
    { id: 1, name: 'Producto 1', price: 1000, category: 'electronics' },
    { id: 2, name: 'Producto 2', price: 2000, category: 'home'},
];

export const getAllProductsService = (category, price) => {
    let result = [...products];

    if (price) {
        result = result.filter(product => product.price == price);
    }
    if (category) {
        result = result.filter(product => product.category == category);
    }

    return result;
};*/

//export const getAllProductsService = () => { return products; }; 








export const createProductService = async (product) => {
    return await createDocument("products", product)
}

export const deleteProductService = async (id) => {
    return await deleteDocument("products", id)
}

export const updateProductService = async (id, data) => {
    return await updateDocument("products", id, data)
}

export const getProductByIdService = async (id) => {
    return await readDocument("products", id);
};

export const getAllProductsByFiltersService = async ({ category, price }) => {
    if (category === undefined && price === undefined) {
        return await readDocuments("products");
    }

    const products = await readDocuments("products");
    // Filtramos los productos según los filtros que se hayan pasado. Si un filtro no se pasó, no lo aplicamos.
    return products.filter(product => {
        // Empezamos asumiendo que el producto cumple todos los filtros.
        let match = true;

        // Si se pasa categoría, verificamos que coincida.
        if (category !== undefined) {
            // Si match = true, match se mantiene true solo si la categoría coincide. Si no coincide, match se vuelve false.
            match = match && product.category === category;
        }

        // Si se pasa precio, verificamos que el producto tenga un precio menor o igual.
        // Si match ya es false, permanece false.
        if (price !== undefined) {
            match = match && product.price <= price;
        }

        // Al final, devolvemos true si el producto pasó todos los filtros activos.
        return match;
    });
};

