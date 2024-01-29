import httpStatus from "http-status"
import AppError from "../../utils/AppError"
import { TShoes } from "./shoes.interface"
import { ShoesModel } from "./shoes.model"


// get all shoes
const getAllShoesFromDb = async () => {
    const result = await ShoesModel.find({})
    return result
}
// get single shoes
const getSingleShoesFromDb = async (id:string) => {
    
    const result = await ShoesModel.findById(id)
    return result
}


//create shoes
const createUserIntoDb = async (payload: TShoes) => {
    const result = await ShoesModel.create(payload)
    return result
}

//delete shoes
const deleteShoesIntoDb = async (id: string) => {

    // check is shoes exist
    const isExistShoes = await ShoesModel.findById(id)
    if (!isExistShoes) {
        throw new AppError(httpStatus.NOT_FOUND, "product not found with the id")
    }
    const result = await ShoesModel.findByIdAndDelete(id)

    return result
}

//update shoes
const updateShoesIntoDb = async (id: string, payload: Partial<TShoes>) => {

   

    // check is shoes exist
    const isExistShoes = await ShoesModel.findById(id)
    if (!isExistShoes) {
        throw new AppError(httpStatus.NOT_FOUND, "product not found with the id")
    }

    // Updating basic course info 
    const updateShoeBasicInfo = await ShoesModel.findByIdAndUpdate(
        id,
        payload,
        { new: true, runValidators: true }
    );
  


    return updateShoeBasicInfo
}
export const ShoesService = {
    getAllShoesFromDb,
    createUserIntoDb,
    deleteShoesIntoDb,
    updateShoesIntoDb,
    getSingleShoesFromDb
}