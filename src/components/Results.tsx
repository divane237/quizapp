import React, { useEffect, useState } from "react";
import { Button } from "../App.styles";
import { AnswerObject } from "../App";
import MyConfetti from "react-confetti";
import CountUp from "react-countup";
import { FailedResults, FinalScore, ResultsContainer } from "./Results.styles";

type Props = {
  handleRestart: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswers: AnswerObject[];
};

const Results: React.FC<Props> = ({ handleRestart, userAnswers }) => {
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
      <Button onClick={handleRestart}>Re-Start</Button>
    </ResultsContainer>
  );
};

export default Results;
