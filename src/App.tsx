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
import Settings from "./components/Settings";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

// start

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [totalQuestions, setTotalQuestions] = useState(10);

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
    if (totalQuestions < 10) {
      setError("Minimum number of questions is 10");
      return;
    }

    if (totalQuestions > 100) {
      setError(" Maximum number of questions is 100");
      return;
    }

    setError("");
    setGameOver(false);
    setLoading(true);
    setNumber(0);
    setUserAnswers([]);

    const { questions: newQuestions, error } = await fetchQuizQuestions(
      totalQuestions,
      difficulty
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
      number + 1 === totalQuestions &&
      userAnswers.length !== totalQuestions
    ) {
      //
      setError("Please answer all questions !!!");
      return;
    }
    setError("");

    //
    setGameOver(true);
  };

  const handleRestart = () => {
    setError("");
    setGameOver(false);
    setLoading(false);
    setQuestions([]);
    setNumber(0);
    setUserAnswers([]);
    setDifficulty(Difficulty.EASY);
    setTotalQuestions(10);
    //
  };

  return (
    <>
      <GlobalStyle />

      <AppContainer>
        <TitleWithBgImage>General Knowledge Quiz</TitleWithBgImage>
        {/* Ttitle with background image */}

        {!loading && questions?.length === 0 && (
          <Settings
            setDifficulty={setDifficulty}
            setTotalQuestions={setTotalQuestions}
          />
        )}
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
                  totalQuestions={totalQuestions}
                />
              </div>
            )}

            <ActionButtonContainer>
              {number >= 1 && <Button onClick={prevQuestion}>👈🏾 Back</Button>}

              {questions.length !== 0 && number + 1 !== totalQuestions && (
                <Button className="next" onClick={nextQuestion}>
                  Next Question 👉🏾
                </Button>
              )}

              {number + 1 === totalQuestions && (
                <Button onClick={quizResults}>Results 🎉</Button>
              )}
            </ActionButtonContainer>
          </QuestionsContainer>
        )}
        {gameOver && (
          <Results
            handleReplay={startTrivia}
            userAnswers={userAnswers}
            onRestart={handleRestart}
          />
        )}
      </AppContainer>
    </>
  );
};

export default App;
