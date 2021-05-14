import { useState } from "react";

import { useSpringCarousel } from "react-spring-carousel-js";
import tw from "twin.macro";

import CarouselItem from "./CarouselItem";
import CarouselThumbItem from "./CarouselThumbItem";
import CarouselWrapper from "./CarouselWrapper";
import ThumbsWrapper from "./ThumbsWrapper";
import ArrowButton from "./ArrowButton";
import ConditionalWrap from "components/ConditionalWrap";

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
      renderItem: <CarouselItem image={image}></CarouselItem>,
      renderThumb: (
        <CarouselThumbItem
          onClick={() => slideToItem(index)}
          isActive={current === index}
          image={image}
        />
      ),
    })),
  });

  useListenToCustomEvent("onSlideChange", (data) => {
    setFirst(data.currentItem === 0);
    setLast(data.currentItem === images.length - 1);
    setCurrent(data.currentItem);
  });

  return (
    <ConditionalWrap
      condition={withThumbs}
      wrap={(children) => (
        <div tw="flex flex-row-reverse gap-1 height[425px]">
          {children}
          <ThumbsWrapper>{thumbsFragment}</ThumbsWrapper>
        </div>
      )}
    >
      <CarouselWrapper>
        <ArrowButton type="prev" isVisible={!isFirst} onClick={slideToPrevItem} />
        {carouselFragment}
        <ArrowButton type="next" isVisible={!isLast} onClick={slideToNextItem} />
      </CarouselWrapper>
    </ConditionalWrap>
  );
};

export default Carousel;
