import styled from "styled-components";
import { StyledArrowButton } from "./ArrowButton";

const S = {};
S.CarouselWrapper = styled.div`
  display: flex;
  position: relative;

  width: 100%;
  height: 100%;

  &:hover {
    ${StyledArrowButton} {
      opacity: 1;
    }
  }
`;

const CarouselWrapper = ({ children }) => {
  return <S.CarouselWrapper>{children}</S.CarouselWrapper>;
};

export default CarouselWrapper;
