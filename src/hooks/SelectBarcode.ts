/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";

import useStore from "../store/storeState";

type Selected = {
  id: number;
};
export const SelectBarcode = () => {
  const { cartData, updateCartData } = useStore((state) => ({
    cartData: state.cartData,
    updateCartData: state.updateCartData,
  }));
  const selectBarcode = useCallback(
    ({ id }: Selected) => {
      const target = cartData.filter((_array, index) => {
        return index !== id;
      });
      updateCartData(target);
    },
    [cartData]
  );

  return { selectBarcode };
};
