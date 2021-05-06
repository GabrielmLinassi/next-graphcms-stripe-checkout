import { useEffect, useState } from "react";
import styled from "styled-components";

import Layout from "components/Layout";
import DisplayListTypes from "components/DisplayListTypes";
import { RangeSlider, RatingMenu, Pagination, Hits, Searchbox, Stats } from "components/algolia";
import { createCart } from "libs/commercejs";

/* --- --- --- */

const S = {};
S.Main = styled.div`
  width: 100%;
`;

S.Side = styled.div`
  flex: 0 0 300px;
  background-color: rgba(0, 0, 0, 0.03);
  padding: 3rem;
`;

S.Split = styled.div`
  display: flex;
  gap: 0.5rem;
`;

S.Wrap = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;

  margin: 1rem 0;
`;

/* --- --- --- */

export default function Home() {
  const [type, setType] = useState("grid");

  useEffect(async () => {
    await createCart();
  }, []);

  return (
    <Layout title="NextJS GraphCMS Stripe Checkout">
      <S.Split>
        <S.Side>
          <h1 className="mb-8">Filters</h1>
          <RatingMenu />
          <div className="mt-5">
            <RangeSlider canRefine={true} attribute="price" />
          </div>
        </S.Side>
        <S.Main>
          <Searchbox showLoadingIndicator />
          <S.Wrap>
            <Stats />
            <DisplayListTypes handleChange={(type) => setType(type)} />
          </S.Wrap>
          <Hits type={type} />
          <Pagination />
        </S.Main>
      </S.Split>
    </Layout>
  );
}
