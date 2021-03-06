import styled from "styled-components";
import Link from "next/link";
import { connectStateResults } from "react-instantsearch-dom";
import tw from "twin.macro";

import RatingWidget from "components/RatingWidget";
import Carousel from "components/carousel/Carousel";
import { formatPrice } from "components/helper";
import { getFilename } from "../../helpers";

const Wrap = styled.div`
  ${({ isList }) => isList && tw`grid grid-template-columns[200px 1fr] gap-4`}
`;

const ImageWrap = styled.div`
  ${tw`p-4`}
  ${({ type }) => type === "list" && tw`border-r`}
  ${({ type }) => type === "grid" && tw`border-b`}
`;

const ContentWrap = styled.div`
  ${({ type }) => (type === "list" ? tw`px-4 py-4 pl-0` : tw`p-4`)}
`;

const Results = connectStateResults(({ searchState, searchResults, children }) =>
  searchResults && searchResults.nbHits !== 0 ? children : <div>loading...</div>
);

export const Hit = ({
  hit: { objectID, name, price, slug, commercejsId, images, stars, comments },
  type,
}) => {
  return (
    <Results>
      <Wrap isList={type === "list"}>
        <ImageWrap type={type}>
          <Carousel images={images.map((image) => getFilename(image))} />
        </ImageWrap>
        <Link key={objectID} href={`/products/${commercejsId}`}>
          <a>
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
              <div className="mt-2 text-xl font-bold">{formatPrice(price)}</div>
            </ContentWrap>
          </a>
        </Link>
      </Wrap>
    </Results>
  );
};

export async function getStaticProps() {
  const res = await fetch("/api/shopify/products");
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}
