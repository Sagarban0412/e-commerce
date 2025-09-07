import express from 'express'
import {create_product,update_product,delete_product} from '../controllers/product.controller.js'

const router = express.Router();

router.post('/create',create_product)
router.put('/update/:id',update_product)
router.delete('/delete/:id',delete_product)



export default router