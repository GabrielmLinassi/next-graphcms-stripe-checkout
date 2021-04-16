const CarouselThumbItem = ({ children, onClick, isActive }) => {
  console.log({ isActive });
  return (
    <div
      className={`w-full h-full ${isActive ? "border border-black p-1" : "border-none"}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CarouselThumbItem;
