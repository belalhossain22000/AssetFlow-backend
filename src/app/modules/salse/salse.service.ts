import httpStatus from "http-status"
import AppError from "../../utils/AppError"
import { ShoesModel } from "../shoes/shoes.model"
import { SaleModel } from "./salse.model"
import { SaleItem } from "./salse.interface"
import { startOfDay, addDays, startOfWeek, startOfMonth, startOfYear } from 'date-fns';

const createSaleIntoDb = async (payload: SaleItem) => {
  const id = payload.productId
  // check is product exist
  const isShoesExist = await ShoesModel.findById(id)



  // checking quantity 0 then will be remove
  if (isShoesExist && isShoesExist.quantity === 0) {
    await ShoesModel.findByIdAndDelete(id)
    throw new AppError(httpStatus.NOT_FOUND, "Shoes not found with the id")
  }

  //check is exist ot not
  if (!isShoesExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Shoes not found with the id")
  }
  // Update shoe quantity
  isShoesExist.quantity -= payload.quantity;
  payload.productName = isShoesExist.name;
  payload.price = isShoesExist.price;

  await ShoesModel.findByIdAndUpdate(id, { quantity: isShoesExist.quantity });

  const result = await SaleModel.create(payload)
  return result
}

const findSalesByDateRange = async (startDate: Date, endDate: Date) => {

  const sales = await SaleModel.find({
    createdAt: { $gte: startDate, $lt: endDate },
  });

  return sales;

};

const findTodaySales = async () => {
  const todayStart = startOfDay(new Date());
  const todayEnd = addDays(todayStart, 1);

  const todaySales = await findSalesByDateRange(todayStart, todayEnd);

  return todaySales;
};

const findLastWeekSales = async () => {
  const lastWeekStart = startOfWeek(new Date());
  const lastWeekEnd = addDays(lastWeekStart, 7);

  const lastWeekSales = await findSalesByDateRange(lastWeekStart, lastWeekEnd);

  return lastWeekSales;
};

const findLastMonthSales = async () => {
  const lastMonthStart = startOfMonth(new Date());
  const lastMonthEnd = addDays(lastMonthStart, 30);

  const lastMonthSales = await findSalesByDateRange(lastMonthStart, lastMonthEnd);

  return lastMonthSales;
};

const findLastYearSales = async () => {
  const lastYearStart = startOfYear(new Date());
  const lastYearEnd = addDays(lastYearStart, 365);

  const lastYearSales = await findSalesByDateRange(lastYearStart, lastYearEnd);

  return lastYearSales;
};

// gate salse history 

const getSalseHistoryFromDb = async () => {

  const salseHistory = {
    todaySale: await findTodaySales(),
    lastWeekSale: await findLastWeekSales(),
    lastMonthSale: await findLastMonthSales(),
    lastYearSale: await findLastYearSales()
  }

  return salseHistory
}

export const SalesService = {
  createSaleIntoDb,
  findTodaySales,
  findLastWeekSales,
  findLastMonthSales,
  findLastYearSales,
  getSalseHistoryFromDb
}