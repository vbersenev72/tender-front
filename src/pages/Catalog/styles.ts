import styled from "styled-components";
import { PageContainer } from "../../styles";

export const CatalogPage = styled(PageContainer)`
  flex-direction: column;
`
export const DocumentsCount = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
export const FinderByID = styled.input`
  border: 1px solid grey;

  height: 40px;
  background: none;
  width: 90%;
  font-family: sans-serif;
  padding: 1%
`;

export const AdvancedFindP = styled.p`
  font-family: sans-serif;
  
  color: gray;
  text-decoration: underline;



`

export const FindByIDButton = styled.button`
  width: 20%;
  background-color: dodgerblue;

  height: 40px;
  border: none;
  color: white;
  font-family: sans-serif;
  margin-left: 0px;
`;
export const ShowCount = styled.div`
  width: auto;
  display: flex;
  gap: 20px;
`;
export const LoaderTest = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;