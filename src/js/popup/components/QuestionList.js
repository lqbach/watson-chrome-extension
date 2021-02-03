import React, { useEffect, useState } from "react";
import Question from "./Question.js";

const QuestionList = (props) => {
  const [questions, setQuestions] = useState([]);
  const [promises, setPromises] = useState([]);

  const fetchQuestions = async (paragraph) => {
    let context = paragraph.par;
    console.log("CALLING API WITH THE FOLLOWING CONTEXT:");
    console.log(context);
    const response = await fetch(process.env.REACT_APP_SERVER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ context: context }),
    });

    console.log(response);
    const data = await response.json();
    data["qa"].forEach((el) => (el.par_id = paragraph.parIndex));
    console.log("RECEIVED FETCH FROM SERVER");
    console.log(data["qa"]);
    return data["qa"];
  };

  useEffect(() => {
    console.log("USE EFFECT CALLED BECAUSE PARAGRAPHS HAVE BEEN CHANGED");
    console.log(props.paragraphs);
    let quests = [];
    // for (let paragraph in props.paragraphs) {
    //   console.log("SENDING IN FIRST PARAGRAPH")
    //   console.log(paragraph)
    //   quests.push(fetchQuestions(paragraph));
    // }
    props.paragraphs.forEach((par) => quests.push(fetchQuestions(par)));

    console.log("QUESTIONS PUSHED INTO QUEUE")
    console.log(quests)

    Promise.allSettled(quests).then(results => {
      console.log("CREATED NEW QUESTIONS");
      let new_quests = [];

      results.forEach((result) => {
        console.log(result)
        if (result.status === "fulfilled"){
          console.log("CONCATTED QUESTIONS")
          new_quests = new_quests.concat(result.value);
        }
      })
      console.log(new_quests);
      setQuestions(new_quests);
    })
    // //select 10 random questions to display
    // let questIndex = [];
    // for (let i = 0; i < quests.length; i++) {
    //   questIndex.push(i);
    // }

    // if (questIndex.length > 10) {
    //   const shuffledIndex = questIndex.sort(() => 0.5 - Math.random());
    //   questIndex = shuffledIndex.slice(0, 10);
    // }

    // let newQuests = questIndex.map((el) => quests[el]);
    // console.log("CREATED NEW QUESTIONS")
    // console.log(newQuests)
    // setQuestions(newQuests);
  }, [props.paragraphs]);

  // useEffect(() => {
  //   Promise.all(promises).then((val) => {
  //     let questIndex = [];
  //     for (let i = 0; i < quests.length; i++) {
  //       questIndex.push(i);
  //     }

  //     if (questIndex.length > 10) {
  //       const shuffledIndex = questIndex.sort(() => 0.5 - Math.random());
  //       questIndex = shuffledIndex.slice(0, 10);
  //     }

  //     let newQuests = questIndex.map((el) => quests[el]);
  //     console.log("CREATED NEW QUESTIONS");
  //     console.log(newQuests);
  //     setQuestions(newQuests);
  //   });
  // }, promises);

  if (props.showList == true) {
    if (questions.length == 0) {
      return <p>Generating questions...</p>;
    } else {
      return (
        <div>
          {questions.map((question) => (
            <Question
              parId={question.par_id}
              sentId={question.sent_num}
              question={question.question}
              answer={question.answer}
              answerId={question.ans_idx}
            />
          ))}
        </div>
      );
    }
  } else {
    console.log("Returning nothing");
    return <div></div>;
  }
};

export default QuestionList;
