import { TShoes } from "./shoes.interface"
import { ShoesModel } from "./shoes.model"



const createUserIntoDb = async (payload:TShoes) => {
    const result = await ShoesModel.create(payload)
    return result
}

export const ShoesService = {
    createUserIntoDb
}