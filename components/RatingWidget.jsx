import PropTypes from "prop-types";
import icons from "public/stars.png";
import styled from "styled-components";

const Star = ({ rate }) => {
  return <StyledIcon rate={rate} />;
};

const ratePosition = (rate) => {
  switch (true) {
    case rate === 5:
      return "-166px -36px";
    case rate >= 4.5:
      return "-84px -28px";
    case rate >= 4:
      return "-84px -8px";
    case rate >= 3.5:
      return "-181px -56px";
    case rate >= 3:
      return "-84px -48px";
    case rate >= 2.5:
      return "-99px -68px";
    case rate >= 2:
      return "-181px -76px";
    case rate >= 1.5:
      return "-390px -164px";
    case rate >= 1:
      return "-375px -144px";
    case rate >= 0.5:
      return "-278px -120px";
    case rate >= 0:
      return "-278px -100px";
  }
};

const StyledIcon = styled.div`
  height: 18px;
  width: 80px;
  background-image: url(${icons});
  background-size: 512px 256px;
  background-repeat: no-repeat;
  background-position: ${({ rate }) => ratePosition(rate)};
`;

const RatingWidget = ({ rate }) => {
  return <Star rate={rate} />;
};

function range(props, propName, componentName) {
  let rate = props[propName];

  if (rate === undefined) {
    return new Error("Sorry you must include a number for range.");
  }

  if (isNaN(rate)) {
    return new Error("Sorry range must be a number.");
  }

  return rate >= 0 && rate <= 5 ? null : new Error("Must be within range of 0 to 5");
}

RatingWidget.propTypes = {
  rate: range,
};

export default RatingWidget;
