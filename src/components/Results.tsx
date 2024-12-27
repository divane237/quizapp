import React, { useEffect, useState } from "react";
import { HomeBtn } from "../App.styles";
import { AnswerObject } from "../App";
import MyConfetti from "react-confetti";
import CountUp from "react-countup";
import { FailedResults, FinalScore, ResultsContainer } from "./Results.styles";

type ResultProps = {
  handleReplay: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswers: AnswerObject[];
  onRestart: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Results: React.FC<ResultProps> = ({
  handleReplay,
  userAnswers,
  onRestart,
}) => {
  //
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [startAnimation, setStartAnimation] = useState(false);

  const detectWindowResize = (): void => {
    //

    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };
  useEffect(() => {
    //
    detectWindowResize();
    window.addEventListener("resize", detectWindowResize);

    return () => {
      window.removeEventListener("resize", detectWindowResize);
    };
  }, []);

  const percentageScore =
    userAnswers?.map((answer) => answer.correct).filter((ans) => ans === true)
      .length / userAnswers?.length;

  return (
    <ResultsContainer>
      {/* Animation of succeeded */}
      {startAnimation && percentageScore * 100 >= 60 && (
        <MyConfetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={300}
          confettiSource={{
            x: 0,
            y: 0,
            w: windowSize.width,
            h: windowSize.height,
          }}
          gravity={-0.05}
        />
      )}

      {/* Animation for failed  */}

      {percentageScore * 100 < 60 && (
        <FailedResults>Goal Not Achieved</FailedResults>
      )}

      {/* Score */}

      <FinalScore>
        <CountUp
          end={100 * percentageScore}
          duration={3}
          prefix="Score: "
          decimals={2}
          decimal="."
          suffix=" %"
          onEnd={() => {
            setStartAnimation(true);
          }}
        />{" "}
      </FinalScore>

      {/* Restart button */}
      <HomeBtn onClick={handleReplay}>
        Re-Play{" "}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-rotate-ccw"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </span>
      </HomeBtn>
      <HomeBtn onClick={onRestart}>
        Re-Start{" "}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-house"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </span>
      </HomeBtn>
    </ResultsContainer>
  );
};

export default Results;
