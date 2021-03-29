import { useEffect, useState } from "react";
import Image from "next/image";
import { useSpringCarousel, OnSlideChange } from "react-spring-carousel-js";

import CarouselItem from "./CarouselItem";
import CarouselWrapper from "./CarouselWrapper";
import ArrowButton from "./ArrowButton";

const Carousel = ({ images }) => {
  const [isFirst, setFirst] = useState(true);
  const [isLast, setLast] = useState(false);

  const {
    carouselFragment,
    slideToNextItem,
    slideToPrevItem,
    useListenToCustomEvent,
  } = useSpringCarousel({
    items: images.map((image, index) => ({
      id: index,
      renderItem: (
        <CarouselItem>
          <Image
            src={image}
            width={400}
            height={400}
            layout="responsive"
            objectFit="contain"
            sizes={[1000]}
          />
        </CarouselItem>
      ),
    })),
  });

  useListenToCustomEvent("onSlideChange", (data) => {
    setFirst(data.currentItem === 0);
    setLast(data.currentItem === images.length - 1);
  });

  return (
    <CarouselWrapper>
      <ArrowButton type="prev" isVisible={!isFirst} onClick={slideToPrevItem} />
      {carouselFragment}
      <ArrowButton type="next" isVisible={!isLast} onClick={slideToNextItem} />
    </CarouselWrapper>
  );
};

export default Carousel;
