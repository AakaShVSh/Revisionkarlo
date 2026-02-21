import axios from 'axios'

export   const fetchData = async (setQuestionsCategory) => {
    try {
      const { data } = await axios.get(
        "https://testwala-backend.onrender.com/QuestionStorage/math"
      );
      console.log("ffff",data.data);
      setQuestionsCategory(data.data);
      // SetTotalQuestion(data.data[0].question.length);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
