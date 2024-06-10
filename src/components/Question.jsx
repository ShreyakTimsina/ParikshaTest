import { useState } from "react";
import Answers from "./Answers";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

export default function Question({
  questions,
  onSelectAnswer,
  //   selectedAnswers,
}) {
  const [answerState, setAnswerState] = useState({
    selectedAnswer: "",
    questionNo: null,
    isCorrect: null,
  });

  //   function binarySearch(answers, target) {
  //     let left = 0;
  //     let right = answers.length - 1;

  //     while (left <= right) {
  //       const mid = Math.floor((left + right) / 2);

  //       if (answers[mid].id === target) {
  //         return true;
  //       } else if (answers[mid].id < target) {
  //         left = mid + 1;
  //       } else {
  //         right = mid - 1;
  //       }
  //     }
  //     return false;
  //   }

  return (
    <>
      <h1 className='text-xl py-8 font-extrabold text-center'>
        {questions.title}
      </h1>
      {questions.subjects.map((subject) => {
        return (
          <div
            key={subject.name}
            className='select-none'
          >
            <h2 className='text-xl py-8 font-bold'>{subject.name}</h2>
            {subject.questions.map((question) => {
              function handleSelectAnswer(answer) {
                setAnswerState({
                  selectedAnswer: answer,
                  questionNo: question.id,
                  isCorrect: question.answers[0] === answer,
                });
                onSelectAnswer(answerState);
              }
              const renderMath = (text) => {
                const regex = /<InlineMath>(.*?)<\/InlineMath>/g;
                return text.split(regex).map((part, index) => {
                  if (index % 2 === 1) {
                    return <InlineMath key={index}>{part}</InlineMath>;
                  }
                  return part;
                });
              };
              return (
                <div
                  key={question.id}
                  className='py-6 text-l text-left'
                >
                  <h2>
                    {question.id}. {renderMath(question.text)}
                  </h2>
                  <Answers
                    answers={question.answers}
                    selectedAnswer={answerState.selectedAnswer}
                    onSelect={handleSelectAnswer}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
