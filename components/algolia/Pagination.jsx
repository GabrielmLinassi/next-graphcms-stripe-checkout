import { Pagination as AlgoliaPagination } from "react-instantsearch-dom";
import styled from "styled-components";

/* --- --- --- */

const S = {};
S.Pagination = styled(AlgoliaPagination)`
  margin-top: 2em;

  .ais-Pagination-list {
    justify-content: center;
    gap: 5px;
  }

  .ais-Pagination-link {
    padding: 0.5em 0.75em;
    justify-content: center;
    align-items: center;
    display: inline-flex;
  }

  .ais-Pagination-item--selected,
  .ais-Pagination-item--page:hover,
  .ais-Pagination-item--nextPage:hover,
  .ais-Pagination-item--previousPage:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  .ais-Pagination-item--disabled {
    &.ais-Pagination-item--nextPage,
    &.ais-Pagination-item--previousPage {
      visibility: hidden;
    }
  }

  .ais-Pagination-link {
    color: rgba(0, 0, 0, 0.45);

    &.ais-Pagination-link--selected {
      color: rgba(0, 0, 0, 0.8);
      font-weight: bold;
    }
  }
`;

/* --- --- --- */

export const Pagination = () => {
  return (
    <S.Pagination
      showNext
      showFirst={false}
      translations={{
        previous: "< Previous",
        next: "Next >",
      }}
    />
  );
};
