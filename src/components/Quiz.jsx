import { useCallback, useState } from "react";
import { Questions } from "../assets/questions";
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setUserAnswers((prevAnswers) => {
      let newUserAnswers = [...prevAnswers, answer];
      function quickSort(userAnswers) {
        if (userAnswers.length <= 1) {
          return userAnswers;
        }

        const pivot = userAnswers[userAnswers.length - 1];
        const left = [];
        const right = [];

        for (let i = 0; i < userAnswers.length - 1; i++) {
          if (userAnswers[i].questionNo < pivot.questionNo) {
            left.push(userAnswers[i]);
          } else {
            right.push(userAnswers[i]);
          }
        }

        return [...quickSort(left), pivot, ...quickSort(right)];
      }
      return quickSort(newUserAnswers);
    });
  }, []);
  if (userAnswers.length === 5) {
    return (
      <Summary
        answers={userAnswers}
        questions={Questions}
      />
    );
  }

  return (
    <div className='p-6 m-6'>
      <Question
        questions={Questions[0]}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswers={userAnswers}
      />
    </div>
  );
}
