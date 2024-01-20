/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { ResBody } from "../types/type";
import useStore from "../store/storeState";

export const InsertCart = () => {

  const { cartData, updateCartData } = useStore((state) => ({
    cartData: state.cartData,
    updateCartData: state.updateCartData
  }))

  const insertCheck = useCallback(
    (list: ResBody, number: string) => {
      updateCartData([...cartData, { list: list, number: number }]);
    },
    [cartData]
  );

  return { insertCheck, cartData };
};
