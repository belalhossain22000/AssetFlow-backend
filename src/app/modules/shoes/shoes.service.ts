import httpStatus from "http-status"
import AppError from "../../utils/AppError"
import { TShoes } from "./shoes.interface"
import { ShoesModel } from "./shoes.model"


// get all shoes
const getAllShoesFromDb = async () => {
    const result = await ShoesModel.find({})
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

    const { size, ...remainingShoesData } = payload

    // check is shoes exist
    const isExistShoes = await ShoesModel.findById(id)
    if (!isExistShoes) {
        throw new AppError(httpStatus.NOT_FOUND, "product not found with the id")
    }

    // Updating basic course info 
    const updateShoeBasicInfo = await ShoesModel.findByIdAndUpdate(
        id,
        remainingShoesData,
        { new: true, runValidators: true }
    );

    // Update size using $addToSet if size is provided
    if (size && size.length > 0) {
        const updatedShoeWithSize = await ShoesModel.findByIdAndUpdate(
            id,
            { $addToSet: { size: { $each: size } } },
            { new: true, runValidators: true }
        );

        return updatedShoeWithSize;
    }


    return updateShoeBasicInfo
}
export const ShoesService = {
    getAllShoesFromDb,
    createUserIntoDb,
    deleteShoesIntoDb,
    updateShoesIntoDb
}