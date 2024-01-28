import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ShoesService } from "./shoes.service";


//get all shoes 
const getAllShoes = catchAsync(async (req, res) => {
    const result = await ShoesService.getAllShoesFromDb()
    
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Shoes retrieve successfully',
        data: result,
    });
});
//get sigle shoes 
const getSingleShoes = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await ShoesService.getSingleShoesFromDb(id)
    
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Shoes retrieve successfully',
        data: result,
    });
});

//create shoes 
const createShoes = catchAsync(async (req, res) => {
    const result = await ShoesService.createUserIntoDb(
        req.body,
    );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Shoes added successfully',
        data: result,
    });
});


//delete shoes
const deleteShoes = catchAsync(async (req, res) => {
    const id = req.params.id
    
    const result = await ShoesService.deleteShoesIntoDb(id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Shoes deleted successfully',
        data: result,
    });
});


//update shoes
const updateShoes = catchAsync(async (req, res) => {
    const id = req.params.id

    const result = await ShoesService.updateShoesIntoDb(id,req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Shoes updated successfully',
        data: result,
    });
});
export const ShoesController = {
    getAllShoes,
    createShoes,
    deleteShoes,
    updateShoes,
    getSingleShoes
}