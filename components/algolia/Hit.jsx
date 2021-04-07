import styled from "styled-components";
import RatingWidget from "components/RatingWidget";
import Carousel from "components/carousel/Carousel";
import Link from "next/link";
import { formatPrice } from "components/helper";

const Wrap = styled.div`
  display: ${({ isList }) => (isList ? "flex" : "block")};
  gap: ${({ isList }) => (isList ? "1rem" : "0")};

  width: 100%;
`;

const ImageWrap = styled.div`
  padding: 1rem;

  ${({ type }) =>
    type === "list" &&
    ` width: 200px;
        box-sizing: content-box;
        border-right: solid 1px rgba(0, 0, 0, 0.1);
      `}

  ${({ type }) =>
    type === "grid" &&
    ` border-bottom: solid 1px rgba(0, 0, 0, 0.1); 
        width: 100%;
      `}
`;

const ContentWrap = styled.div`
  ${({ type }) => (type === "list" ? `padding: 1rem 1rem 1rem 0;` : `padding: 1rem;`)}
  width: 100%;
`;

export const Hit = ({ hit: { objectID, name, price, slug, images, stars, comments }, type }) => {
  return (
    <Link key={objectID} href={`/products/${slug}`}>
      <Wrap isList={type === "list"}>
        <ImageWrap type={type}>
          <Carousel images={images} />
        </ImageWrap>
        <ContentWrap type={type}>
          <div className="text-sm clamp-line">{name}</div>
          <div className="flex items-end gap-2">
            <div>
              <RatingWidget rate={stars} />
            </div>
            <a href="#" className="text-sm text-blue-500">
              {comments}
            </a>
          </div>
          <div className="font-bold mt-2 text-xl">{formatPrice(price)}</div>
        </ContentWrap>
      </Wrap>
    </Link>
  );
};
