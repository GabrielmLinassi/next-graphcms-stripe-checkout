import styled from "styled-components";
import { Hits as AlgoliaHits, connectStateResults } from "react-instantsearch-dom";
import { Hit } from "./Hit";
import Skeleton from "react-loading-skeleton";
import tw from "twin.macro";

const S = {};
S.Hits = styled(AlgoliaHits)`
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

const Results = connectStateResults(({ searchState, searchResults, children }) =>
  searchResults && searchResults.nbHits !== 0 ? (
    children
  ) : (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "0.5rem",
      }}
    >
      {[1, 2, 3, 4, 5, 6].map(() => (
        <div tw="flex flex-col items-center gap-5 bg-white rounded-md shadow-md p-1">
          <div style={{ width: "100%" }}>
            <Skeleton height={250} tw="" />
            <Skeleton height={100} />
          </div>
        </div>
      ))}
    </div>
  )
);

export const Hits = ({ type }) => {
  return (
    <Results>
      <S.Hits hitComponent={(props) => <Hit {...props} type={type} />} grid={type === "grid"} />
    </Results>
  );
};
