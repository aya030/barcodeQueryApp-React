/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { ResBody } from "../types/type";
import { cartDataState } from "../recoil/recoiState";
import { useRecoilState } from "recoil";

export const InsertCart = () => {
  const [cartArray, setCartArray] = useRecoilState(cartDataState);

  const insertCheck = useCallback(
    (list: ResBody, number: string) => {
      setCartArray([...cartArray, { list: list, number: number }]);
    },
    [cartArray]
  );

  return { insertCheck, cartArray };
};
