import express from 'express'
import auth from "../../middlewares/auth"
import { validateData } from "../../middlewares/validateData"
import { saleValidationSchema } from "./salse.validation"
import { SalseController } from "./salse.controller"

const router = express.Router()

// shoes get route
router.post("/",auth("user"),validateData(saleValidationSchema),
    SalseController.createSale
)


export const SaleRouter = router