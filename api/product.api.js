import request from "./Request";
import { PRODUCT } from "./config";

export const requestAllProduct = async () => {
  return await request.get(PRODUCT.COFFEE);
};

