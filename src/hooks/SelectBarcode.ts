/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { cartDataState } from "../recoil/recoiState";

type Selected = {
  id: number;
};
export const SelectBarcode = () => {
  const [cartArray, setCartArray] = useRecoilState(cartDataState);

  const selectBarcode = useCallback(
    ({ id }: Selected) => {
      const target = cartArray.filter((_array, index) => {
        return index !== id;
      });
      setCartArray(target);
    },
    [cartArray]
  );

  return { selectBarcode };
};
