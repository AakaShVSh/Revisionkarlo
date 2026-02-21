import {
  Box,
  Flex,
  Link,
  Icon,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Image,
  Container
} from '@chakra-ui/react';
import logo from "../logo.svg";

function Sidebar() {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container bg={"#465074"}>
      <Flex
        // as="nav"
        pos="fixed"
        top="0"
        left="0"
        bottom="0"
        w="30vh"
        p={"3"}
        bg={"#465074"}
        color="white"
        // py="6"
        // px="4"
        // direction="column"
        justify="space-between"
      >
        {/* <Link
          as={Icon}
          name="logo"
          size="24px"
          color="teal.500"
          // onClick={onOpen}
        /> */}
      
          <Box> 
          {" "}
          <Image
            src={logo}
            bg={"#465074"}
            w={"80%"}
            m={"0%"}
            pb={"3%"}
            color={"White"}
            alt="logo"
          />
          <Link to={"/"}>
            <Text borderBottomWidth="1px" mt={"3%"}>
              <Text fontSize="lg" fontWeight="bold" cursor={"pointer"}>
                Home
              </Text>
            </Text></Link>
            <Box color={"white"} borderBottomWidth="1px" fontWeight="bold">
              <Link
                as={Text}
                fontSize="lg"
                // color="gray.600"
                href="#"
              >
                Dashboard
              </Link>
              <Link
                as={Text}
                fontSize="lg"
                // color="gray.600"
                href="#"
              >
                Settings
              </Link>
            </Box>
           
          </Box>
      </Flex>
    </Container>
  );
}

export default Sidebar;