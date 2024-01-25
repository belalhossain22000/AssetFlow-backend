import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SalesService } from "./salse.service";

//create sale 
const createSale = catchAsync(async (req, res) => {
    const result = await SalesService.createSaleIntoDb(req.body)
    
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Sale created successfully',
        data: result,
    });
});

export const SalseController={
createSale
}