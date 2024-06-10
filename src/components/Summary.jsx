export default function Summary({ questions, answers }) {
  let correct = 0;
  answers.forEach((answer) => {
    if (answer.isCorrect) {
      correct++;
    }
  });
  return (
    <>
      <h1>Total Marks: {correct}</h1>
      {questions.subjects.map((subject) => {
        return (
          <div
            key={subject.name}
            className='select-none'
          >
            <h2 className='text-xl py-8 font-bold'>{subject.name}</h2>
            {subject.questions.map((question, index) => {
              return (
                <div
                  key={question.id}
                  className='py-6'
                >
                  <h2
                    className='text-l text-left'
                    dangerouslySetInnerHTML={{
                      __html: question.id + ".  " + question.text,
                    }}
                  ></h2>
                  <h3
                    dangerouslySetInnerHTML={{
                      __html:
                        "Selected Answer:  " +
                        answers[index + 1]?.selectedAnswer,
                    }}
                  ></h3>
                  <h3
                    dangerouslySetInnerHTML={{
                      __html: "Correct Answer:  " + question.answers[0],
                    }}
                  ></h3>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
