import { useEffect, useState } from "react";
import { connectRange, Panel } from "react-instantsearch-dom";
import styled from "styled-components";

// Prerequisite: install rheostat@4
import "rheostat/initialize";
import Rheostat from "rheostat";
import "rheostat/css/rheostat.css";

export const RangeSlider = connectRange(({ min, max, currentRefinement, canRefine, refine }) => {
  const [stateMin, setStateMin] = useState(min);
  const [stateMax, setStateMax] = useState(max);

  useEffect(() => {
    if (canRefine) {
      setStateMin(currentRefinement.min);
      setStateMax(currentRefinement.max);
    }
  }, [currentRefinement.min, currentRefinement.max]);

  if (min === max) {
    return null;
  }

  const onChange = ({ values: [min, max] }) => {
    if (currentRefinement.min !== min || currentRefinement.max !== max) {
      refine({ min, max });
    }
  };

  const onValuesUpdated = ({ values: [min, max] }) => {
    setStateMin(min);
    setStateMax(max);
  };

  return (
    <StyledPanel header="Price Range">
      <Rheostat
        min={min}
        max={max}
        values={[currentRefinement.min, currentRefinement.max]}
        onChange={onChange}
        onValuesUpdated={onValuesUpdated}
      >
        <div className="rheostat-marker rheostat-marker--large" style={{ left: 0 }}>
          <div className="rheostat-value">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
              stateMin
            )}
          </div>
        </div>
        <div className="rheostat-marker rheostat-marker--large" style={{ right: 0 }}>
          <div className="rheostat-value">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
              stateMax
            )}
          </div>
        </div>
      </Rheostat>
    </StyledPanel>
  );
});

const StyledPanel = styled(Panel)`
  .ais-Panel-header {
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    border-bottom: 1px solid #c4c8d8;
  }
`;
