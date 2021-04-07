import styled from "styled-components";
import { SearchBox } from "react-instantsearch-dom";

const S = {};
S.SearchBox = styled(SearchBox)`
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

export const Searchbox = () => <S.SearchBox />;
