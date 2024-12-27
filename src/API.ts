import { shuffleArray } from "./utils";
//

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type FetchQuizResult = {
  questions?: QuestionState[];
  error?: string; //Error message on failure
};

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://opentdb.com";

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<FetchQuizResult> => {
  const endpoint = `${API_URL}/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) throw new Error("Data was not fetched");

    const data = await response.json();

    //

    const shuffledResults: QuestionState[] = data.results.map(
      (question: Question) => ({
        ...question,
        answers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      })
    );

    return { questions: shuffledResults };
    //
  } catch (error: unknown) {
    let errorMessage = "An unknow error occured";

    if (error instanceof SyntaxError) {
      errorMessage = `JSON Parsing error: ${error.message}`;
    } else if (error instanceof TypeError) {
      errorMessage = `Network error or invalid fetch: ${error.message}`;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { error: errorMessage };
  }
};
