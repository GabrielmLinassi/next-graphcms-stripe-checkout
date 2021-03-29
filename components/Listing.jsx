import styled from "styled-components";

import CustomStats from "./../components/algolia-widgets/Stats";
import GridIcon from "components/icons/Grid";
import ListIcon from "components/icons/List";

const Listing = ({ handleChange }) => {
  const Wrap = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;

    margin: 1rem 0;
  `;

  const Button = styled.button`
    :focus {
      outline: none;
    }
  `;

  return (
    <Wrap>
      <div>
        <CustomStats />
      </div>
      <div>
        <Button onClick={() => handleChange("list")}>
          <ListIcon />
        </Button>
        <Button onClick={() => handleChange("grid")}>
          <GridIcon />
        </Button>
      </div>
    </Wrap>
  );
};

export default Listing;
