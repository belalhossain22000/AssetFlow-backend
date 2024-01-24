import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ShoesService } from "./shoes.service";


const createShoes=catchAsync(async (req, res) => {
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

export const ShoesController={
    createShoes
}