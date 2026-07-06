import { getProductByIdService, getAllProductsByFiltersService, createProductService, updateProductService, deleteProductService } from "../services/products.service.js";

export const getAllProducts = async (req, res) => {
    try {
        const { category, price } = req.query;

        const products = await getAllProductsByFiltersService({ category, price });
        if (products.length === 0) {
            return res.status(404).json({ error: 'No products match the filters' });
        }
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
        message: error.message
        });

    }
};



export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({message: 'Product ID is required'});
        }
        const product = await getProductByIdService(id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Serrver Error" });
        console.error("Entró x acá en get x id")
    }
};

export const getAllProductsByQuery = async (req, res) => {
    try {
        const { categoryQuery, priceQuery } = req.query;
        /*let price = undefined;

        //Si el query param existe, lo convertimos a número
        //Si no existe, dejamos proce como undefined para no filtrar por precio
        if(priceQuery !== undefined){
            price = Number(priceQuery)
        };

        // Si el query param existe pero no es un número válido, deviolvemos un error
        if(priceQuery !== undefined && Number.isNaN(price)){
            return res.status(400).json({message: 'PInvalid price'});
        };

        //Si no se pasan filtros, devolvemos todos los productos
        if(categoryQuery === undefined && price === undefined){
            const products = await getAllProductsByFiltersService({category: categoryQuery, price})
        };

        */
        const products = await getAllProductsByFiltersService({category: categoryQuery, price: priceQuery})
        
        //Si no encuentra productos con esos filtros, devolvemos un error 404
        if(products.length === 0){
            return res. status(404).json({message: 'No products match the filters'});
        };
        return res.status(200).json(products);
        
        } catch (error) {
            res.status(500).json({
            message: error.message
            });
        }
};


export const createProduct = async (req, res) => {
    const product = req.body.product
    console.log(product)
    if (!product) {
        return res.status(400).json({ message: 'Product information is required' });
    }
    try {
        const id = await createProductService(product)
        product.id = id
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error getting product' });
    }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        await updateProductService(id, data);
        res.status(200).json({ message: 'Product updated!' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Product updating error' });
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    try {
        await deleteProductService(id);
        return res.status(200).json({ message: "Product deleted" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting product" });
    }
};