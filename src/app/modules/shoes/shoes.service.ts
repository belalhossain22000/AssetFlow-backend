import httpStatus from "http-status"
import AppError from "../../utils/AppError"
import { TShoes } from "./shoes.interface"
import { ShoesModel } from "./shoes.model"


// get all shoes
const getAllShoesFromDb = async () => {

     // Delete  quantity 0
     await ShoesModel.deleteMany({ quantity: 0 });

    const result = await ShoesModel.find({ quantity: { $gt: 0 } })
    return result
}
// get single shoes
const getSingleShoesFromDb = async (id: string) => {

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

// bulk delete
const bulkDeleteFromDb = async (ids: string[]) => {

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Please provide valid IDs to delete');
    }

    // Check if all provided IDs are valid
    const shoesExist = await ShoesModel.find({ _id: { $in: ids } });
    if (shoesExist.length !== ids.length) {
        throw new AppError(httpStatus.NOT_FOUND, 'One or more shoes not found with the provided IDs');
    }

    // Delete shoes with the provided IDs
    const result = await ShoesModel.deleteMany({ _id: { $in: ids } });
    return result

}

export const ShoesService = {
    getAllShoesFromDb,
    createUserIntoDb,
    deleteShoesIntoDb,
    updateShoesIntoDb,
    getSingleShoesFromDb,
    bulkDeleteFromDb
}