import React, { useEffect, useState } from "react";

const QuestionList = (props) => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async (context) => {
    console.log(process.env.REACT_APP_SERVER);
    const response = await fetch(process.env.REACT_APP_SERVER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context: context }),
    });

    const data = await response.json();
    console.log("REQUEST RECEIVED: ")
    console.log(data)
    setQuestions(data["qa"]);
  };

  useEffect(() => {
    console.log("Sending first paragraph from context");
    console.log(props.paragraphs[0]);
    fetchQuestions(props.paragraphs[0]);
  }, [props.paragraphs]);

  console.log("logging paragraphs");
  console.log(props.showList);
  console.log(props.paragraphs);
  if (props.showList == true) {
    if (questions.length == 0) {
      return <p>Generating questions...</p>;
    } else {
      console.log(questions[0]);
      return <p>{JSON.stringify(questions[0])}</p>;
    }
  } else {
    console.log("Returning nothing");
    return <div></div>;
  }
};

export default QuestionList;
