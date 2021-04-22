import { Stats as AlgoliaStats, connectStateResults } from "react-instantsearch-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import tw from "twin.macro";

const Results = connectStateResults(({ searchState, searchResults, children }) =>
  searchResults && searchResults.nbHits !== 0 ? children : <Skeleton width={200} />
);

export const Stats = () => {
  return (
    <div tw="flex-1">
      <Results>
        <AlgoliaStats />
      </Results>
    </div>
  );
};
