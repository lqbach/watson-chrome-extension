import React, { useEffect, useState } from "react";

const QuestionList = (props) => {
    console.log("logging paragraphs")
    console.log(props.showList)
    console.log(props.paragraphs)
    if (props.showList == true){
        return(
            <p>{props.paragraphs}</p>
        )
    }
    else{
        console.log("Returning nothing")
        return(
            <div></div>    
        )
    }

}

export default QuestionList;
