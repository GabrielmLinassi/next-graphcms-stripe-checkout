import tw from "twin.macro";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getFilename } from "../../helpers";
import axios from "axios";

const CarouselThumbItem = ({ image, onClick, isActive }) => {
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    const filename = image;
    axios.get(`/api/images/${filename}`).then(({ data }) => setUrl(data));
  }, [image]);

  if (!url) {
    return <div>loading...</div>;
  }

  return (
    <div
      onClick={onClick}
      css={[tw`w-full h-full`, isActive ? tw`p-1 border border-black` : tw`border-none`]}
    >
      <Image src={url} width={150} height={150} />
    </div>
  );
};

export default CarouselThumbItem;
