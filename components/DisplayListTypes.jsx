import styled from "styled-components";
import { Grid as GridIcon, List as ListIcon } from "components/icons/index";
import { createContext, useState } from "react";

const S = {};
S.Button = styled.button`
  :focus {
    outline: none;
  }
`;

export const DisplayListTypes = ({ handleChange }) => {
  return (
    <div>
      <S.Button onClick={() => handleChange("list")}>
        <ListIcon />
      </S.Button>
      <S.Button onClick={() => handleChange("grid")}>
        <GridIcon />
      </S.Button>
    </div>
  );
};
