import { useRef } from "react";

export const useCountRenders = () => {
  const count = useRef(0);
  console.log("renders: ", count.current++);
};
