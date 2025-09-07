import express from 'express'
import create_category from '../controllers/category.controller.js'

const router = express.Router();

router.post('/',create_category)

export default router