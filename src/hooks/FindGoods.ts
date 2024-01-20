/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { ResBody } from "../types/type";
import useStore from "../store/storeState";

export const FindGoods = () => {
  const url = "/mock/barcode-list";
  const { barcodeLists, soloData, modalOpen, updateBarcodeLists, updateSoloData, updateModalOpen } = useStore((state) => ({
    barcodeLists: state.barcodeLists,
    soloData: state.soloData,
    modalOpen: state.modalOpen,
    updateBarcodeLists: state.updateBarcodeLists,
    updateSoloData: state.updateSoloData,
    updateModalOpen: state.updateModalOpen
  }))
  const [show, setShow] = useState(true);
  const readBarcode = useCallback(async (barcode: string) => {
    setShow(false);
    try {
      const result: AxiosResponse<ResBody[]> = await axios.get(url, {
        params: {
          code: barcode,
        },
      });
      if (result.data.length == 1) {
        updateSoloData(result.data);
        updateModalOpen();
      } else {
        updateBarcodeLists(result.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setShow(true);
    }
  }, []);

  return { show, readBarcode, soloData, barcodeLists, modalOpen };
};
