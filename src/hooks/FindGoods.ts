/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { ResBody } from "../types/type";
import { useRecoilState } from "recoil";
import {
  barcodeListState,
  modalOpenState,
  soloDataState,
} from "../recoil/recoiState";

export const FindGoods = () => {
  const url = "/mock/barcode-list";
  const [barcodeList, setBarcodeList] =
    useRecoilState<ResBody[]>(barcodeListState);
  const [show, setShow] = useState(true);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [soloData, setSoloData] = useRecoilState<ResBody[]>(soloDataState);
  const readBarcode = useCallback(async (barcode: string) => {
    setShow(false);
    try {
      const result: AxiosResponse<ResBody[]> = await axios.get(url, {
        params: {
          code: barcode,
        },
      });
      if (result.data.length == 1) {
        setSoloData(result.data);
        setModalOpen(true);
      } else {
        setBarcodeList(result.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setShow(true);
    }
  }, []);

  return { show, readBarcode, soloData, barcodeList, modalOpen };
};
