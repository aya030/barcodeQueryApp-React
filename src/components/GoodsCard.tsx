/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback } from "react";
import { Box, Card, List, ListItem } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  barcodeListState,
  modalOpenState,
  numberState,
  soloDataState,
} from "../recoil/recoiState";
import { ResBody } from "../types/type";
import { ModalData } from "./GoodsModalData";

export const GoodsCardComponent = memo(() => {
  const barcodeLists = useRecoilValue(barcodeListState);
  const [soloData, setSoloData] = useRecoilState(soloDataState);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const setNumber = useSetRecoilState(numberState);

  const onModalOpen = useCallback((barCodeList: ResBody) => {
    setSoloData([barCodeList]);
    setModalOpen(true);
  }, []);

  const onModalClose = useCallback(() => {
    setModalOpen(false);
    setSoloData([]);
    setNumber("");
  }, []);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        mx="auto"
        textAlign="center"
      >
        {barcodeLists.length >= 2
          ? barcodeLists.map((barcodeList) => {
              return (
                <Card
                  border="2px"
                  borderColor="blue.200"
                  boxShadow="2xl"
                  rounded="md"
                  borderRadius="xl"
                  h="100%"
                  w="20%"
                  m="20px"
                  p="15px"
                  pb="50px"
                  cursor="pointer"
                  role="group"
                  position="relative"
                  overflow="hidden"
                  onClick={() => onModalOpen(barcodeList)}
                  key={barcodeList.id}
                >
                  <List spacing={3}>
                    <ListItem fontSize="xs">{barcodeList.image}</ListItem>
                    <ListItem fontSize="xs">{barcodeList.code}</ListItem>
                    <ListItem fontSize="lg" isTruncated>{barcodeList.name}</ListItem>
                  </List>
                  <Box
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                    h="20%"
                    bottom="0"
                    left="50%"
                    color="white"
                    transform="translate(-50%,50%)"
                    transition="all 0.6s ease"
                    _groupHover={{
                      transform: "translate(-50%,0)",
                      bgColor: "teal",
                    }}
                  >
                    DETAIL
                  </Box>
                </Card>
              );
            })
          : ""}
      </Box>
      <ModalData
        modalList={soloData}
        isOpen={modalOpen}
        onClose={onModalClose}
      />
    </>
  );
});
