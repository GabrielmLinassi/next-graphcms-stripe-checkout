import image from "./cart.png";
import styled from "styled-components";

export default function Cart() {
  const color = "#333";

  // Amazon Icon style
  // return <Icon />;

  return (
    <svg
      version="1.1"
      xmlns="https://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="40px"
      height="32px"
      viewBox="0 0 50.613 50.613"
      enable-background="new 0 0 50.613 50.613"
    >
      <path
        fill={color}
        d="M49.569,11.145H20.055c-0.961,0-1.508,0.743-1.223,1.661l4.669,13.677c0.23,0.738,1.044,1.336,1.817,1.336h19.35c0.773,0,1.586-0.598,1.814-1.336l4.069-14C50.783,11.744,50.344,11.145,49.569,11.145z"
      ></path>
      <circle cx="22.724" cy="43.575" r="4.415" fill={color}></circle>
      <circle cx="41.406" cy="43.63" r="4.415" fill={color}></circle>
      <path
        fill={color}
        d="M46.707,32.312H20.886L10.549,2.568H2.5c-1.381,0-2.5,1.119-2.5,2.5s1.119,2.5,2.5,2.5h4.493L17.33,37.312h29.377c1.381,0,2.5-1.119,2.5-2.5S48.088,32.312,46.707,32.312z"
      ></path>
    </svg>
  );
}

const Icon = styled.div`
  width: 40px;
  height: 30px;
  background-image: url(${image});
  background-position: -9px -338px;
  background-repeat: no-repeat;
  filter: brightness(0.6);
`;
