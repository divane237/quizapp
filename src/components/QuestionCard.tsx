import React, { useEffect, useState } from "react";
import { AnswerButton, AnswersContainer } from "../App.styles";
import DOMPurify from "dompurify";
import { Question, QuestionNumber } from "./QuestionCard.styles";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;

  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  questionNr,
  totalQuestions,
}) => {
  // Track selected answers by question number
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number | null;
  }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  useEffect(() => {
    // Set the initial selected answer for the current question when it loads

    setSelectedAnswer(selectedAnswers[questionNr] ?? null);
  }, [questionNr, selectedAnswers]);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    callback(e);
    setSelectedAnswer(index);
    setSelectedAnswers((prev) => ({ ...prev, [questionNr]: index })); // Save selected answer by question number
  };

  // Purify html from source
  const sanitizedQuestion = DOMPurify.sanitize(question);

  return (
    <section>
      {/* Question number */}

      <QuestionNumber>
        Question: {questionNr + 1} / {totalQuestions}
      </QuestionNumber>

      {/* Question */}
      {/* <p className="question">{question}</p> */}

      <Question dangerouslySetInnerHTML={{ __html: sanitizedQuestion }} />

      {/* Answers */}
      <AnswersContainer>
        {answers.map((answer, i) => {
          const sanitizedAnswer = DOMPurify.sanitize(answer);
          return (
            <AnswerButton
              key={`${i}`}
              onClick={(e) => {
                handleClick(e, i);
              }}
              value={answer}
              selected={selectedAnswer === i}
              dangerouslySetInnerHTML={{ __html: sanitizedAnswer }}
            />
          );
        })}
      </AnswersContainer>
    </section>
  );
};

export default QuestionCard;
