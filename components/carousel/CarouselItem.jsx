import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getFilename } from "../../helpers";
import axios from "axios";

const S = {};
S.CarouselItem = styled.div`
  width: 100%;
  height: 100%;
`;

const CarouselItem = ({ image }) => {
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    const filename = getFilename(image);
    axios.get(`/api/images/${filename}`).then(({ data }) => setUrl(data));
  }, []);

  if (!url) {
    return <div>loading...</div>;
  }

  return (
    <S.CarouselItem>
      <Image src={url} width={300} height={300} />
    </S.CarouselItem>
  );
};

export default CarouselItem;
