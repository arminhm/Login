import express from "express";
import {
    getProducts,
    getProductsId,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/Products.js"

const router = express.Router();

// get : sacar recursos del back , post : guardar/crear recursos del back , put : modificar todo el recurso
// delete : elimina recrusos del back  , patch : modificar parte del recurso

router.get('/products', getProducts);
router.get('/products/:id', getProductsId);
router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);




export default router;