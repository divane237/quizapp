import styled, { createGlobalStyle } from "styled-components";
import BGImage from "./images/picture1.jpg";
import titleImage from "./images/cameroon-flag1.jpg";

export const GlobalStyle = createGlobalStyle`
 html {
 /*  */

 }

body {
    background-image: url(${BGImage});
    background-size: cover;
    background-repeat:no-repeat;    
    user-select: none;
    background-attachment: fixed; 
    height: 100dvh;
    width: 100vw;
  

    /* Adjust padding for smaller screens */
    @media (max-width: 768px) {
        padding: 0;
    }

    @media (max-width: 480px) {
        padding: 0;
        height: 100svh;
    }
}

*, *::before, *::after {
    box-sizing: border-box;
    font-family: 'Raleway, sans-serif';
    margin: 0;
    padding: 0;
}

h1 {
    font-size: clamp(2rem, 2vw + 1.5rem, 3.5rem);
}
p {
    font-size: 1rem;
}
`;

// Container for app

export const AppContainer = styled.div`
  /*  */

  height: 100dvh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

// Container for the questions, add responsiveness to blur and padding

export const QuestionsContainer = styled.div`
  backdrop-filter: blur(35px);
  -webkit-backdrop-filter: blur(15px);
  padding: 4px 8px;
  color: whitesmoke;
  margin: 2px 4px auto 8px;
  align-self: center;
  @media (max-width: 768px) {
    padding: 3px 6px;
  }

  @media (max-width: 480px) {
    padding: 2px 4px;
    backdrop-filter: blur(20px);
  }
`;

// Answers container with responsive flex adjustments

export const AnswersContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 8px 4px;

  /* Switch to column layout on mobile and tablet */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

// Answer button with responsive padding and font-size

interface AnswerButtonProps {
  selected: boolean;
}

export const AnswerButton = styled.button<AnswerButtonProps>`
  background: ${(props) => (props.selected ? "green" : "#FFF")};
  color: black;
  margin: 10px 12px;
  padding: 0.4rem 0.5rem;
  font-size: 1rem;
  word-spacing: 5px;
  letter-spacing: 1px;
  border: none;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;

  &:hover {
    outline-offset: 1px;
    outline: 2.5px solid green;
  }
  &:focus {
    outline-offset: 1px;
    outline: 2.5px solid green;
  }

  /* Adjust padding and font size on smaller screens */
  @media (max-width: 768px) {
    padding: 0.3rem 0.4rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.3rem;
    font-size: 0.8rem;
  }
`;

export const Button = styled.button`
  background-color: gray;
  border: none;
  font-size: 1rem;
  border-radius: 16px;
  color: black;
  font-weight: 900;
  margin: 10px 12px;
  padding: 0.5rem 1rem;

  &:focus {
    outline-offset: 3px;
    outline: 2.5px solid skyblue;
  }

  /* Adjust font-size and padding for smaller screens */
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }
`;

export const StartBtn = styled(Button)`
  /*  */
  margin: 12px auto;
`;

// Container for Back, Next, and Results with responsive spacing

export const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;

  /* Maintain row layout on all screen sizes */
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

// Title with responsive padding and text adjustments

export const TitleWithBgImage = styled.h1`
  background-color: skyblue;
  background-image: url(${titleImage});
  background-repeat: no-repeat;
  background-size: cover;
  white-space: nowrap;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: clamp(2rem, 2vw + 1.5rem, 3.5rem);
  text-align: center;
  text-transform: uppercase;
  -webkit-font-smoothing: antialiased;
  padding: 4px 8px;
  margin: auto 8px;
  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 2vw + 1rem, 2.5rem);
  }

  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 2vw + 0.8rem, 2rem);
  }
`;

export const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-weight: 600;
  word-spacing: 4px;
  font-size: 1rem;
  margin: auto 2px;

  /* Adjust font-size for smaller screens */
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
