import styled from "styled-components";
import { ArrowLeft, ArrowRight } from "components/icons/index";

export const StyledArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;

  ${({ type }) =>
    type === "prev"
      ? `left: 0;
         right: auto;`
      : `left: auto;
         right: 0;`}

  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  opacity: 0;

  background-color: rgba(253, 230, 138, 1);
  color: #8d99ae;

  border-radius: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:focus {
    outline: none;
  }
`;

const ArrowButton = ({ onClick, type, isVisible }) => {
  return (
    <StyledArrowButton type={type} onClick={onClick} isVisible={isVisible}>
      {type === "prev" ? <ArrowLeft /> : <ArrowRight />}
    </StyledArrowButton>
  );
};

export default ArrowButton;
