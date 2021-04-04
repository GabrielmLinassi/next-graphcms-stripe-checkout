import { useState } from "react";
import styled from "styled-components";
import { gql, GraphQLClient } from "graphql-request";
const algoliasearch = require("algoliasearch");
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import "instantsearch.css/themes/reset.css";
import Link from "next/link";

import { formatPrice } from "components/helper";
import Layout from "components/Layout";
import CustomRangeSlider from "components/algolia-widgets/RangeSlider";
import CustomRatingMenu from "components/algolia-widgets/RatingMenu";
import Listing from "components/Listing";
import Pagination from "components/algolia-widgets/Pagination";
import RatingWidget from "components/RatingWidget";
import Carousel from "components/carousel/Carousel";
import { respondTo } from "styles/_respondTo";
import { clampBuilder } from "utils/clampBuilder";
import { useShopify } from "contexts/shopify";

const client = algoliasearch("MRLYG735R2", "553f555a65bcc73f82e29ffdc73e503b");
const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export default function Home() {
  const [type, setType] = useState("grid");
  const HitWithType = (props) => <Hit {...props} type={type} />;
  const { shopify } = useShopify();

  return (
    <Layout title="NextJS GraphCMS Stripe Checkout">
      <ExampleComponent />
      <InstantSearch searchClient={client} indexName="products">
        <Split>
          <Side>
            <h1 style={{ marginBottom: "2rem" }}>Filters</h1>
            <CustomRatingMenu />
            <div className="mt-5">
              <CustomRangeSlider canRefine={true} attribute="price" />
            </div>
          </Side>
          <Main>
            <StyledSearchBox />
            <Listing handleChange={(type) => setType(type)} />
            <StyledHits hitComponent={HitWithType} grid={type === "grid"} />
            <Pagination />
          </Main>
        </Split>
      </InstantSearch>
    </Layout>
  );
}

const Hit = ({ hit: { objectID, name, price, slug, images, stars, comments }, type }) => {
  const Wrap = styled.div`
    display: ${({ isList }) => (isList ? "flex" : "block")};
    gap: ${({ isList }) => (isList ? "1rem" : "0")};

    width: 100%;
  `;

  const ImageWrap = styled.div`
    padding: 1rem;

    ${type === "list" &&
    ` width: 200px;
      box-sizing: content-box;
      border-right: solid 1px rgba(0, 0, 0, 0.1);
    `}

    ${type === "grid" &&
    ` border-bottom: solid 1px rgba(0, 0, 0, 0.1); 
      width: 100%;
    `}
  `;

  const ContentWrap = styled.div`
    ${type === "list" ? `padding: 1rem 1rem 1rem 0;` : `padding: 1rem;`}
    width: 100%;
  `;

  return (
    <Link key={objectID} href={`/products/${slug}`}>
      <Wrap isList={type === "list"}>
        <ImageWrap>
          <Carousel images={images} />
        </ImageWrap>
        <ContentWrap>
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

const fetchProducts = gql`
  {
    products {
      id
      name
      price
      slug
      images(first: 1) {
        id
        url(transformation: { image: { resize: { width: 500, height: 500, fit: crop } } })
        fileName
        height
        width
      }
    }
  }
`;

export async function getStaticProps() {
  const { products } = await graphcms.request(fetchProducts);

  return {
    props: {
      products,
    },
  };
}

const Main = styled.div``;

const Side = styled.div`
  flex: 0 0 300px;
  background-color: rgba(0, 0, 0, 0.03);
  padding: 3rem;
`;

const Split = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StyledSearchBox = styled(SearchBox)`
  .ais-SearchBox-form {
    display: flex;
    padding: 0 1rem;
    background-color: white;
  }

  .ais-SearchBox-input {
    flex-grow: 1;
    padding: 10px 0;
    outline: none;
    background-color: transparent;
  }

  .ais-SearchBox-submit,
  .ais-SearchBox-reset {
    outline: none;
  }

  .ais-SearchBox-submit {
    margin-right: 10px;
  }

  .ais-SearchBox-submitIcon,
  .ais-SearchBox-resetIcon {
    width: 1rem;
    height: 1rem;
    fill: gray;
  }
`;

const StyledHits = styled(Hits)`
  margin-top: 0;

  .ais-Hits-list {
    grid-template-columns: ${(props) =>
      props.grid ? "repeat(3, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"};
    gap: 0.5rem;
  }

  .ais-Hits-item {
    padding: 0;
    align-items: ${(props) => (props.grid ? "center" : "flex-start")};
  }
`;

// Background color changes to
// red from breakpoint sm (600px)
export const ExampleComponent = () => {
  const StyledExampleComponent = styled.div`
    background-color: blue;
    margin: ${clampBuilder(1.5, 3.5)};

    ${respondTo.forTabletPortraitUp`
      background-color: red;
    `}

    ${respondTo.forDesktopUp`
      background-color: green;
    `}
  `;

  return <StyledExampleComponent>Test</StyledExampleComponent>;
};
