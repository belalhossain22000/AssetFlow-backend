import httpStatus from "http-status"
import AppError from "../../utils/AppError"
import { ShoesModel } from "../shoes/shoes.model"
import { SaleModel } from "./salse.model"
import { SaleItem } from "./salse.interface"


const createSaleIntoDb = async (payload: SaleItem) => {

    const id = payload.productId
    // check is product exist
    const isShoesExist = await ShoesModel.findById(id)
    
   
    //check is exist ot not
    if (!isShoesExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Shoes not found with the id")
    }

     // checking quantity 0 then will be remove
     if (isShoesExist && isShoesExist.quantity === 0) {
        await ShoesModel.findByIdAndDelete(id)
    }


    const result = await SaleModel.create(payload)
    return result
}

export const SalesService = {
    createSaleIntoDb
}