import styled from "styled-components";
import { Hits as AlgoliaHits } from "react-instantsearch-dom";

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

export const Hits = (props) => <S.Hits {...props} />;
