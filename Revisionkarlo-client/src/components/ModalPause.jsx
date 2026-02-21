import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";

const ModalPause = ({
  markedAndAnswer,
  question,
  markedNotAnswer,
  notAnswer,
  answered,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [statusTable, setStatusTable] = useState(false);
  const [TestHeading, setTestHeading] = useState(null);
  useEffect(() => {
    setTestHeading(getLocalStorage("category"));
  });
  return (
    <>
      <Button
        onClick={onOpen}
        key={"xl"}
        border={"1px solid #01bfbd"}
        color={"#01bfbd"}
      >
        Pause
      </Button>
      <Modal
        onClose={onClose}
        size={statusTable ? "6xl" : "xl"}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            {!statusTable ? (
              "Are you sure you want to pause"
            ) : (
              <Table>
                <Thead>
                  <Tr>
                    <>
                    <Th>Section</Th>
                    <Th>Total Question</Th>
                    <Th>Not visited</Th>
                    <Th>Not Answered</Th>
                    <Th>Answered</Th>
                    <Th>Marked</Th>
                    <Th>Marked & Answered</Th></>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <>
                    <Td>{TestHeading}</Td>
                    <Td>{question.length}</Td>
                    <Td>
                      {question.length -
                        (notAnswer.length +
                          answered.length +
                          markedNotAnswer.length +
                          markedAndAnswer.length)}
                    </Td>
                    <Td>{notAnswer.length}</Td>
                    <Td>{answered.length}</Td>
                    <Td>{markedNotAnswer.length}</Td>
                    <Td>{markedAndAnswer.length}</Td></>
                  </Tr>
                </Tbody>
              </Table>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              mr={"2%"}
              onClick={() => {
                onClose();
                setStatusTable(false);
              }}
            >
              {statusTable ? "Resume test" : "No"}
            </Button>
            {!statusTable ? (
              <Button onClick={() => setStatusTable(true)}>Yes</Button>
            ) : null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPause;
