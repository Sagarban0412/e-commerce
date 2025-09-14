import express from 'express'
import {create_category,get_category} from '../controllers/category.controller.js'
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/',upload.single("image"),create_category)
router.get('/',get_category)

export default router