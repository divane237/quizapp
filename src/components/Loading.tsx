import { LoadingContainer, LoadingDot } from "./Loading.styles";

const Loading = () => {
  return (
    <LoadingContainer>
      {[...Array(6)].map((_, index) => (
        <LoadingDot key={index} index={index} />
      ))}
    </LoadingContainer>
  );
};

export default Loading;
