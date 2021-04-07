import { RatingMenu as AlgoliaRatingMenu, Panel } from "react-instantsearch-dom";
import styled from "styled-components";

/* --- --- --- */

const S = {};
S.Panel = styled(Panel)`
  .ais-Panel-header {
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    border-bottom: 1px solid #c4c8d8;
  }
`;

S.RatingMenu = styled(AlgoliaRatingMenu)`
  .ais-RatingMenu-starIcon {
    width: 15px;
    fill: #ffc168;
  }

  .ais-RatingMenu-link > * + * {
    margin-left: 0.3rem;
  }

  .ais-RatingMenu-count {
    color: #3a4570;
  }

  .ais-CurrentRefinements-count:before,
  .ais-RatingMenu-count:before {
    content: "(";
  }

  .ais-CurrentRefinements-count:after,
  .ais-RatingMenu-count:after {
    content: ")";
  }

  .ais-RatingMenu-item--selected {
    font-weight: bold;
  }
`;

/* --- --- --- */

export const RatingMenu = () => {
  return (
    <>
      <S.Panel header="Ratings">
        <S.RatingMenu
          attribute="rating"
          translations={{
            ratingLabel: "& Up",
          }}
        />
      </S.Panel>
    </>
  );
};
