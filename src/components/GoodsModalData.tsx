/* eslint-disable prefer-const */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { ChangeEventHandler, FC, memo, useCallback } from "react";
import { ResBody } from "../types/type";
import { InsertCart } from "../hooks/InsertCart";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartDataState, numberState } from "../recoil/recoiState";

type modalType = {
  onClose: () => void;
  isOpen: boolean;
  modalList: ResBody[];
};

export const ModalData: FC<modalType> = memo((props) => {
  const { onClose, isOpen, modalList } = props;
  const { insertCheck } = InsertCart();
  const regex = /^0/;
  const [number, setNumber] = useRecoilState(numberState);
  const cartArray = useRecoilValue(cartDataState);

  const onChangeNumber: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNumber(e.target.value.replace(/[^0-9]/g, ""));
  };

  const onSend = useCallback(
    (list: ResBody, number: string) => {
      console.log(cartArray);
      insertCheck(list, number);
      setNumber("");
      onClose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [number]
  );

  const initialRef = React.useRef(null);

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="scale"
    >
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent bgColor="beige">
        <ModalHeader>ADD TO INVENTORY</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {modalList.map((modalList) => {
            return (
              <Box key={modalList.id}>
                <Stack spacing={5}>
                  <Text>
                    IMAGE{" "}
                    <span style={{ marginLeft: "10px" }}>
                      {modalList.image}
                    </span>
                  </Text>

                  <Text>
                    CODE{" "}
                    <span style={{ marginLeft: "15px" }}>{modalList.code}</span>
                  </Text>

                  <Text>
                    NAME{" "}
                    <span style={{ marginLeft: "10px" }}>{modalList.name}</span>
                  </Text>

                  <FormControl display="flex">
                    <FormLabel>ADD TO INVENTORY</FormLabel>
                    <Input
                      w="100px"
                      h="28px"
                      ml="35px"
                      type="text"
                      value={number}
                      onChange={onChangeNumber}
                      ref={initialRef}
                      placeholder="number"
                    />
                    <span style={{ marginLeft: "10px" }}>items</span>
                  </FormControl>
                </Stack>
                <Box display="flex" justifyContent="right" my="30px">
                  <Button
                    isDisabled={Boolean(number.match(regex)) || number === ""}
                    _hover={{ bgColor: "teal" }}
                    colorScheme="blue"
                    mr={3}
                    onClick={() => onSend(modalList, number)}
                  >
                    SEND
                  </Button>
                  <Button
                    _hover={{ bgColor: "black" }}
                    bgColor="dimgray"
                    colorScheme="blue"
                    mr={3}
                    onClick={onClose}
                  >
                    CLOSE
                  </Button>
                </Box>
              </Box>
            );
          })}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
