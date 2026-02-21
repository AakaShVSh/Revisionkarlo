import {
  HStack,
  Button,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MdOutlineSimCardAlert } from "react-icons/md";

const ReportQuestionDropdown = () => {
  const frameworks = [
    { label: "Wrong Question", value: "Wrong Question" },
    { label: "Question Format Wrong", value: "Question Format Wrong" },
    { label: "Answer missing", value: "Answer missing" },
    { label: "Other", value: "Other" },
  ];

  return (
    <Box>
      <HStack>
        <Menu>
          <MenuButton as={Button}  rightIcon={<MdOutlineSimCardAlert />}>
            Report
          </MenuButton>
          <MenuList>
            {frameworks.map((framework, index) => (
              <MenuItem key={index} value={framework.value}>
                {framework.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
};

export default ReportQuestionDropdown;
