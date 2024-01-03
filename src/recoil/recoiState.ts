import { atom } from "recoil";
import { Item, ResBody } from "../types/type";

export const barcodeListState = atom<ResBody[]>({
  key: "BARCODE_LIST",
  default: [],
});

export const soloDataState = atom<ResBody[]>({
  key: "SOLODATA_LIST",
  default: [],
});

export const modalOpenState = atom<boolean>({
  key: "MODALOPEN_LIST",
  default: false,
});

export const cartDataState = atom<Item[]>({
  key: "CARTDATA_LIST",
  default: [],
});

export const numberState = atom<string>({
  key: "OBJ",
  default: "",
});
