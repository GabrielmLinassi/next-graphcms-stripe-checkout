import styled from "styled-components";

const S = {};
S.CarouselItem = styled.div`
  width: 100%;
  height: 100%;
`;

const CarouselItem = ({ children }) => {
  return <S.CarouselItem>{children}</S.CarouselItem>;
};

export default CarouselItem;
