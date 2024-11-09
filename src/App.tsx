import { useState } from "react";
import { fetchQuizQuestions } from "./API";
import QuestionCard from "./components/QuestionCard";

// styles
import {
  ActionButtonContainer,
  AppContainer,
  Button,
  ErrorMessage,
  GlobalStyle,
  QuestionsContainer,
  StartBtn,
  TitleWithBgImage,
} from "./App.styles";

// Types
import { Difficulty, QuestionState } from "./API";
import Results from "./components/Results";
import Loading from "./components/Loading";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [gameOver, setGameOver] = useState(false);

  // Function to override an object in the array
  const overrideObject = (newObject: AnswerObject) => {
    setUserAnswers((prevUserAnswers) => {
      const index = prevUserAnswers.findIndex(
        (prevUserAnswer) => prevUserAnswer.question === newObject.question
      );

      if (index !== -1) {
        // Update the object if it exists
        return prevUserAnswers.map((prevUserAnswer) =>
          prevUserAnswer.question === newObject.question
            ? newObject
            : prevUserAnswer
        );
      } else {
        // Add the new object if it doesn't exist
        return [...prevUserAnswers, newObject];
      }
    });
  };

  const startTrivia = async (): Promise<void> => {
    setError("");
    setGameOver(false);
    setLoading(true);
    setGameOver(false);
    setNumber(0);
    setUserAnswers([]);

    const { questions: newQuestions, error } = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    if (error) {
      setLoading(false);
      setError("Failed to load questions");
      return;
    } else {
      setQuestions(newQuestions ?? []);

      setLoading(false);
    }

    //
  };

  const saveAnswers = (e: React.MouseEvent<HTMLButtonElement>): void => {
    //
    const newUserAnswerObject = {
      question: questions[number].question,
      answer: e.currentTarget.value,
      correct: e.currentTarget.value === questions[number].correct_answer,
      correctAnswer: questions[number].correct_answer,
    };

    overrideObject(newUserAnswerObject);

    //
  };

  const nextQuestion = (): void => {
    setNumber(number + 1);
    setError("");
    //
  };

  const prevQuestion = (): void => {
    setNumber(number - 1);
    setError("");

    //
  };

  const quizResults = () => {
    //
    if (
      number + 1 === TOTAL_QUESTIONS &&
      userAnswers.length !== TOTAL_QUESTIONS
    ) {
      //
      setError("Please answer all questions !!!");
      return;
    }
    setError("");

    //
    setGameOver(true);
  };

  return (
    <>
      <GlobalStyle />

      <AppContainer>
        {/* Ttitle with background image */}
        <TitleWithBgImage>General Knowledge Quiz</TitleWithBgImage>

        {/* Loading state */}
        {loading && <Loading />}

        {/* Start */}
        {!loading && questions?.length === 0 && (
          <StartBtn onClick={startTrivia}>Start</StartBtn>
        )}

        {/* Errors */}
        <ErrorMessage>{error} </ErrorMessage>

        {/* Questions */}
        {!loading && !gameOver && questions?.length >= 1 && (
          <QuestionsContainer>
            {!loading && questions?.length !== 0 && (
              <div>
                <QuestionCard
                  question={questions[number].question}
                  answers={questions[number].answers}
                  callback={saveAnswers}
                  questionNr={number}
                  totalQuestions={TOTAL_QUESTIONS}
                />
              </div>
            )}

            <ActionButtonContainer>
              {number >= 1 && <Button onClick={prevQuestion}>👈🏾 Back</Button>}

              {questions.length !== 0 && number + 1 !== TOTAL_QUESTIONS && (
                <Button className="next" onClick={nextQuestion}>
                  Next Question 👉🏾
                </Button>
              )}

              {number + 1 === TOTAL_QUESTIONS && (
                <Button onClick={quizResults}>Results 🎉</Button>
              )}
            </ActionButtonContainer>
          </QuestionsContainer>
        )}

        {gameOver && (
          <Results handleRestart={startTrivia} userAnswers={userAnswers} />
        )}
      </AppContainer>
    </>
  );
};

export default App;
