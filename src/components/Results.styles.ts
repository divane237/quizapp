import styled from "styled-components";

export const ResultsContainer = styled.div`
  /*  */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 6px 8px;
  margin: auto 4px;
`;

export const FailedResults = styled.p`
  /*  */

  font-size: 1.3rem;
  color: red;
  margin: 1rem 2rem;
  font-weight: 800;
  letter-spacing: 2px;
  font-family: "Times New Roman", Times, serif;
  animation: animation-for-failed-result 5s ease-in-out 0.3s infinite alternate;
  user-select: none;
  @keyframes animation-for-failed-result {
    from {
      transform: scale(1);
    }

    to {
      transform: scale(1.8);
    }
  }
`;

export const FinalScore = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  font-family: monospace;
  letter-spacing: 1px;
  user-select: none;
  color: whitesmoke;
`;
