/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useCallback, ChangeEventHandler, useState } from "react";
import Quagga from "@ericblade/quagga2";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { PacmanLoader } from "react-spinners";
import { FindGoods } from "../hooks/FindGoods";
import { BarCodeCamera } from "../hooks/BarCodeCamera";
import { useRecoilValue } from "recoil";
import { cartDataState } from "../recoil/recoiState";
import { Header } from "../components/Header";
import { PopOverComponent } from "../components/CartPopOver";
import { GoodsCardComponent } from "../components/GoodsCard";

export const BarcodeReader: FC = memo(() => {
  const { show, readBarcode } = FindGoods();
  const { barcode, ScanStart, setBarcode } = BarCodeCamera();
  const [scanCameraFlg, setScanCameraFlg] = useState(true);
  const cartArray = useRecoilValue(cartDataState);

  /* 
    QUERYボタンを押した時の処理
  */
  const handleClick = useCallback(() => {
    readBarcode(barcode);
  }, [barcode]);

  /* 
    テキストボックスに値を入力する
  */
  const onChangeBarcode: ChangeEventHandler<HTMLInputElement> = (e) => {
    //入力するバーコードの値を14桁以内に制限する
    if (e.target.value.length <= 14) {
      setBarcode(e.target.value.replace(/[^0-9]/g, ""));
    }
  };

  /* 
    SCANボタンを押した時の処理
  */
  const handleScan = useCallback(() => {
    setScanCameraFlg(false);
    ScanStart();
  }, []);

  /* 
    SCANボタンをキャンセルする時の処理
  */
  const CancelScan = useCallback(() => {
    setScanCameraFlg(true);
    Quagga.stop();
    document.querySelector(".camera")!.innerHTML = "";
  }, []);

  return (
    <Stack>
      <Header>
        PUSH <span style={{ color: "indianred", fontSize: "20px" }}>SCAN</span>{" "}
        TO READ BARCODE THEN ONCE YOU GET BARCODE, PUSH{" "}
        <span style={{ color: "tomato", fontSize: "20px" }}>QUERY</span> TO
        SEARCH
      </Header>
      <Spacer borderBottom="1px" borderColor="blue.200" />

      {/* テキストボックス */}
      <InputGroup position="relative" w={350} size="md" mx="auto" mt="30px">
        <Input
          pr="4.5rem"
          placeholder="BARCODE NUMBER"
          onChange={onChangeBarcode}
          value={barcode}
        />
        <InputRightElement width="5rem" pr="0.5rem">
          <Button
            isLoading={show ? false : true}
            spinner={<PacmanLoader size={8} color="white" />}
            colorScheme="blue"
            h="2rem"
            size="sm"
            onClick={handleClick}
          >
            QUERY
          </Button>
        </InputRightElement>
      </InputGroup>

      {/* SCANボタン */}
      <Button
        bgColor="aliceblue"
        color="dimgray"
        boxShadow="inner"
        mx="auto"
        w="150px"
        mt={5}
        _hover={{ color: "aliceblue", bgColor: "dimgray", boxShadow: "outer" }}
        onClick={handleScan}
      >
        SCAN
      </Button>

      {/* スキャンカメラを表示 */}
      {scanCameraFlg ? null : <div className="mask" onClick={CancelScan}></div>}
      <div className="camera"></div>

      {/* カートボタン */}
      <Box position="relative" width="1050px" mx="auto">
        <PopOverComponent />
        <Button
          borderRadius="100%"
          fontSize="14px"
          width="16px"
          height="16px"
          position="absolute"
          right="80px"
          bottom="40px"
          bg="none"
          _hover={{ bg: "none" }}
        >
          {cartArray.length}
        </Button>
      </Box>

      {/* 検索した商品一覧結果を表示 */}
      <GoodsCardComponent />
    </Stack>
  );
});
