import express from 'express'
import { validateData } from '../../middlewares/validateData'
import shoeValidationSchema, { updateShoeValidationSchema } from './shoes.validation'
import { ShoesController } from './shoes.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

// shoes get route
router.get("/",auth("user"),
    ShoesController.getAllShoes
)
router.get("/:id",auth("user"),
    ShoesController.getSingleShoes
)
// shoes add route
router.post("/add-shoes",auth("user"),
    validateData(shoeValidationSchema),
    ShoesController.createShoes
)
// delete shoes route
router.delete("/delete/:id",auth("user"),
    ShoesController.deleteShoes
)

// update shoes route
router.put("/update/:id",auth("user"),validateData(updateShoeValidationSchema),
    ShoesController.updateShoes
)
// update shoes route
router.put("/bulk-delete",auth("user"),
    ShoesController.bulkDelete
)

export const ShoesRouter = router