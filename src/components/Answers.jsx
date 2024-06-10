// import { useRef } from "react";
import "katex/dist/katex.min.css";
import { useRef } from "react";
import { InlineMath } from "react-katex";

export default function Answers({ answers, onSelect, selectedAnswer }) {
  let i = 0;

  //   const suffledAnswers = useRef();
  //   if (!suffledAnswers.current) {
  //     suffledAnswers.current = [...answers];
  //     suffledAnswers.current.sort(() => Math.random() - 0.5);
  //   }

  function convertToRoman(num) {
    const romanNumerals = [
      { value: 4, symbol: "iv" },
      { value: 1, symbol: "i" },
    ];

    let roman = "";
    for (let i = 0; i < romanNumerals.length; i++) {
      while (num >= romanNumerals[i].value) {
        roman += romanNumerals[i].symbol;
        num -= romanNumerals[i].value;
      }
    }
    return roman;
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
    <ul>
      {answers.map((answer) => {
        i++;
        const isSelected = answer === selectedAnswer;
        let cssClass = "list-none text-left p-4";
        if (isSelected) {
          cssClass = "text-left p-4 bg-green-500";
        }
        return (
          <li
            key={answer}
            className='list-none'
          >
            <button
              className={cssClass}
              onClick={() => onSelect(answer)}
            >
              {convertToRoman(i)}. {renderMath(answer)}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
