import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Image,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { memo, useRef } from "react";
import { SelectBarcode } from "../hooks/SelectBarcode";
import { useRecoilState } from "recoil";
import { cartDataState } from "../recoil/recoiState";

export const PopOverComponent = memo(() => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectBarcode } = SelectBarcode();
  const [cartArray, setCartArray] = useRecoilState(cartDataState);

  /* カート内の商品をDELETEする処理 */
  const onCLickDelete = (id: number) => {
    selectBarcode({ id });
  };

  /* カート内の商品をDBに登録する時の処理 */
  const onSend = () => {
    //カートの中身を空にする
    setCartArray([]);
    onClose();
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src="/src/assets/shopCart.svg"
          position="absolute"
          right="100px"
          bottom="15px"
          cursor="pointer"
          _hover={{ bg: "none", opacity: ".5" }}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          Confirmation!{" "}
          <Button
            isDisabled={cartArray.length === 0}
            onClick={onOpen}
            colorScheme="teal"
            h="30px"
            w="60px"
            ml="80px"
            fontSize="10px"
          >
            SEND
          </Button>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  SEND TO DATABASE
                </AlertDialogHeader>
                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button
                    colorScheme="blue"
                    w="100px"
                    ref={cancelRef}
                    onClick={onSend}
                  >
                    SEND
                  </Button>
                  <Button colorScheme="red" w="100px" onClick={onClose} ml={3}>
                    CANCEL
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </PopoverHeader>
        <PopoverBody>
          <Box>
            {cartArray.map((cart, index) => {
              return (
                <Box key={cart.list.id} border="2px" mb="20px" p="5px">
                  <List>
                    <ListItem>Code : {cart.list.code}</ListItem>
                    <ListItem>Name : {cart.list.name}</ListItem>
                    <ListItem>Number : {cart.number}</ListItem>
                  </List>
                  <Button
                    colorScheme="blue"
                    h="30px"
                    w="60px"
                    fontSize="10px"
                    ml="180px"
                    onClick={() => onCLickDelete(index)}
                  >
                    DELETE
                  </Button>
                </Box>
              );
            })}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
});
