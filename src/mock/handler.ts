// src/mocks/handlers.js
import { rest } from "msw";
import barcodeDatas from "./data/mockData.json";

export const handlers = [
  rest.get("/mock/barcode-list", (req, res, ctx) => {
    const code = req.url.searchParams.get("code");
    try {
      //バーコードの入力値が空の時は全部取得
      if (code == "") {
        return res(ctx.json(barcodeDatas));
      } else {
        const barcode = barcodeDatas.filter(
          (barcodeData) => barcodeData.code === code
        );
        return res(ctx.json(barcode));
      }
    } catch (e) {
      console.log(e, "error");
    }
  }),
];
