import React, { useEffect, useState } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { getLocalStorage } from "../helpers/localStorage";

const SavedPage = () => {
   const topic = getLocalStorage("savedtopic");
   const [saveData,setsaveData] = useState(null)
   console.log(topic);
   useEffect(() => {
  if(topic === "math"){
        const loval = getLocalStorage("saveData")
        console.log(loval[1]);
        
        setsaveData(loval)
   }
   if(topic === "eng"){
      const loval = getLocalStorage("saveData")
        console.log(loval[1]);
        
        setsaveData([loval])
   }

   },[])
 
     
    //  const [saveData] = useState([math[1]])
  return (
    <Box p={4}>
      <Heading size="lg">Saved Page</Heading>
      <Text mt={2}>Review reported questions categorized by type.</Text>
      <VStack spacing={4} mt={4} align="start">
        {saveData?.map((Saved, index) => {
          if (index === 0) return null;

          return (
            <Box
              key={index}
              p={4}
              borderWidth={1}
              borderRadius="md"
              width="100%"
            >
              <Heading size="md">Category: {Saved.exam}</Heading>
              <Text mt={2}>
                <strong>Question:</strong> {Saved.qus}
              </Text>

              {Saved?.options?.length > 0 && (
                <Text mt={2}>
                  <strong>Options:</strong> {Saved.options.join(", ")}
                </Text>
              )}

              <Text mt={2}>
                <strong>Answer:</strong> {Saved.answer}
              </Text>
              <Text mt={2}>
                <strong>Explanation:</strong> {Saved.explanation}
              </Text>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default SavedPage;
