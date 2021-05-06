import tw from "twin.macro";

const CarouselThumbItem = ({ children, onClick, isActive }) => (
  <div
    onClick={onClick}
    css={[tw`w-full h-full`, isActive ? tw`p-1 border border-black` : tw`border-none`]}
  >
    {children}
  </div>
);

export default CarouselThumbItem;
