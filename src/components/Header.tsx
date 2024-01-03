import { Heading, Text } from "@chakra-ui/react";
import { FC,  memo } from "react";

type Header = {
  children: React.ReactNode
}

export const Header : FC<Header> = memo(({children}) => {
  return (
    <>
      <Heading textAlign="center" mt="30px" pb="30px">
        BARCODE QUERY APP
      </Heading>
      <Text textAlign="center" py="2">{children}</Text>
    </>
  );
})
