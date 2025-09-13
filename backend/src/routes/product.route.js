import express from 'express'
import {create_product,update_product,delete_product,get_product, get_productById} from '../controllers/product.controller.js'
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/',get_product)
router.get('/:id',get_productById)
router.post('/create',upload.single("image"),create_product)
router.put('/update/:id',upload.single("image"),update_product)
router.delete('/delete/:id',delete_product)



export default router