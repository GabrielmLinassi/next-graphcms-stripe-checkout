import Link from "next/link";
import Image from "next/image";
import { gql, GraphQLClient } from "graphql-request";
import Layout from "../components/Layout";
import { formatPrice } from "../components/helper";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
const algoliasearch = require("algoliasearch");
import "instantsearch.css/themes/reset.css";
import styled from "styled-components";

const client = algoliasearch("MRLYG735R2", "553f555a65bcc73f82e29ffdc73e503b");
const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export default function Home() {
  return (
    <Layout title="NextJS GraphCMS Stripe Checkout">
      <InstantSearch searchClient={client} indexName="products">
        <Split>
          <Side>left</Side>
          <Main>
            <StyledSearchBox />
            <Hits hitComponent={Hit} />
          </Main>
        </Split>
      </InstantSearch>
    </Layout>
  );
}

const Hit = ({ hit: { objectID, name, price, slug, images } }) => {
  return (
    <Link key={objectID} href={`/products/${slug}`}>
      <a>
        {images.length && <Image src={images[0]} width={500} height={500} />}
        <div>
          {name}
          <div className="font-bold mt-3">{formatPrice(price)}</div>
        </div>
      </a>
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
        url(
          transformation: {
            image: { resize: { width: 500, height: 500, fit: crop } }
          }
        )
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
  background-color: red;
  padding: 0 5rem;
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
