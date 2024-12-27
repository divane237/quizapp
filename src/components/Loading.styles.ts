import styled, { keyframes } from "styled-components";

// Keyframes for the color change animation
const colorChange = keyframes`
  0% {
    background-color: gray;
  }
  50% {
    background-color: goldenrod;
  }
  100% {
    background-color: gray;
  }
`;

// Container to position the dots in a circle
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  position: relative;
`;

// Dots arranged in a circle using absolute positioning
export const LoadingDot = styled.div<{ index: number }>`
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: gray;
  border-radius: 50%;
  animation: ${colorChange} 3s infinite ease-in-out;
  animation-delay: ${(props) => `${props.index * 0.5}s`};

  /* Position the dots in a circle */
  transform: rotate(${(props) => props.index * 60}deg) translate(50px)
    rotate(-${(props) => props.index * 60}deg);
`;
