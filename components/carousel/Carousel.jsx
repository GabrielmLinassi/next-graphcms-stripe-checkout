import { useState } from "react";
import Image from "next/image";
import { useSpringCarousel } from "react-spring-carousel-js";

import CarouselItem from "./CarouselItem";
import CarouselThumbItem from "./CarouselThumbItem";
import CarouselWrapper from "./CarouselWrapper";
import ThumbsWrapper from "./ThumbsWrapper";
import ArrowButton from "./ArrowButton";

const Carousel = ({ images, withThumbs = false }) => {
  const [isFirst, setFirst] = useState(true);
  const [isLast, setLast] = useState(false);
  const [current, setCurrent] = useState(0);

  const {
    carouselFragment,
    slideToNextItem,
    slideToPrevItem,
    thumbsFragment,
    useListenToCustomEvent,
    slideToItem,
  } = useSpringCarousel({
    withThumbs: withThumbs,
    thumbsSlideAxis: "y",
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
      renderThumb: (
        <CarouselThumbItem onClick={() => slideToItem(index)} isActive={current === index}>
          <Image src={image} width={150} height={150} />
        </CarouselThumbItem>
      ),
    })),
  });

  useListenToCustomEvent("onSlideChange", (data) => {
    setFirst(data.currentItem === 0);
    setLast(data.currentItem === images.length - 1);
    setCurrent(data.currentItem);
  });

  const Wrapper = withThumbs
    ? ({ children }) => (
        <div
          style={{
            display: "flex",
            flexFlow: "row-reverse",
            height: "425px",
            gap: ".25rem",
          }}
        >
          {children}
          <ThumbsWrapper>{thumbsFragment}</ThumbsWrapper>
        </div>
      )
    : ({ children }) => <>{children}</>;

  return (
    <Wrapper>
      <CarouselWrapper>
        <ArrowButton type="prev" isVisible={!isFirst} onClick={slideToPrevItem} />
        {carouselFragment}
        <ArrowButton type="next" isVisible={!isLast} onClick={slideToNextItem} />
      </CarouselWrapper>
    </Wrapper>
  );
};

export default Carousel;
