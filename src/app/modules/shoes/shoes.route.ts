import express from 'express'
import { validateData } from '../../middlewares/validateData'
import shoeValidationSchema from './shoes.validation'
import { ShoesController } from './shoes.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

// shoes add route
router.post("/add-shoes",auth("user"),
    validateData(shoeValidationSchema),
    ShoesController.createShoes
)

export const ShoesRouter = router