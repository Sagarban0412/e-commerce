import express from 'express'
import {create_category,get_category} from '../controllers/category.controller.js'

const router = express.Router();

router.post('/',create_category)
router.get('/',get_category)

export default router