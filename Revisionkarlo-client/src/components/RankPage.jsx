import React, { useEffect, useState } from 'react'
import { getLocalStorage } from '../helpers/localStorage';
import { Box } from '@chakra-ui/react';

const RankPage = () => {
  const [AllUserDataForRank,setAllUserDataForRank] = useState([])
  const [CurrentUserData,setCurrentUserData] = useState([]);
  const [rank,setrank] = useState(0);
  const [userdata,setUserData] = useState([]);

  useEffect(() => {
    setAllUserDataForRank(getLocalStorage("AllUserTestData"));
    setCurrentUserData(getLocalStorage("test"));
    setrank(getLocalStorage("rank"));
    setUserData(getLocalStorage("test"));
  },[])
  return (
    <div>
      <Box w="80%" border="1px solid red" m="auto">

      </Box>
    </div>
  )
}

export default RankPage
